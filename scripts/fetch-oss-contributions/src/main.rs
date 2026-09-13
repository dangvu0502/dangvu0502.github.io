use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Deserialize)]
struct GitHubUser {
    login: String,
}

#[derive(Debug, Deserialize)]
struct PullRequestQueryResponse {
    items: Vec<PullRequest>,
}

#[derive(Debug, Deserialize)]
struct PullRequest {
    number: u32,
    title: String,
    html_url: String,
    state: String,
    created_at: String,
    updated_at: String,
    repository_url: String,
}

#[derive(Debug, Serialize)]
struct OSSContribution {
    repository: String,
    pr_number: String,
    link: String,
    title: String,
    state: String,
    created_at: String,
    updated_at: String,
}

fn get_github_token() -> Result<String> {
    env::var("GITHUB_TOKEN").context("GITHUB_TOKEN environment variable is required")
}

fn get_username(client: &reqwest::blocking::Client, token: &str) -> Result<String> {
    if let Ok(username) = env::var("GITHUB_USERNAME") {
        return Ok(username);
    }

    let response = client
        .get("https://api.github.com/user")
        .header("Authorization", format!("Bearer {}", token))
        .header("Accept", "application/vnd.github+json")
        .header("X-GitHub-Api-Version", "2022-11-28")
        .header("User-Agent", "fetch-github-user")
        .send()
        .context("Failed to fetch GitHub user")?;

    if !response.status().is_success() {
        anyhow::bail!(
            "GitHub API request failed: {} {}",
            response.status(),
            response.text().unwrap_or_default()
        );
    }

    let user: GitHubUser = response.json().context("Failed to parse user response")?;
    Ok(user.login)
}

fn fetch_user_pull_requests(
    client: &reqwest::blocking::Client,
    token: &str,
    username: &str,
) -> Result<Vec<PullRequest>> {
    let query = format!("is:pr author:{} is:public", username);
    let url = format!(
        "https://api.github.com/search/issues?q={}&sort=created&order=desc&per_page=7",
        urlencoding::encode(&query)
    );

    let response = client
        .get(&url)
        .header("Authorization", format!("Bearer {}", token))
        .header("Accept", "application/vnd.github+json")
        .header("X-GitHub-Api-Version", "2022-11-28")
        .header("User-Agent", "fetch-oss-contributions")
        .send()
        .context("Failed to fetch pull requests")?;

    if !response.status().is_success() {
        anyhow::bail!(
            "GitHub API request failed: {} {}",
            response.status(),
            response.text().unwrap_or_default()
        );
    }

    let search_response: PullRequestQueryResponse = response
        .json()
        .context("Failed to parse search response")?;
    Ok(search_response.items)
}

fn transform_pr_data(prs: Vec<PullRequest>) -> Vec<OSSContribution> {
    prs.into_iter()
        .map(|pr| {
            let repository = pr
                .repository_url
                .strip_prefix("https://api.github.com/repos/")
                .unwrap_or("unknown")
                .to_string();

            OSSContribution {
                repository,
                pr_number: pr.number.to_string(),
                link: pr.html_url,
                title: pr.title,
                state: pr.state,
                created_at: pr.created_at,
                updated_at: pr.updated_at,
            }
        })
        .collect()
}


#[derive(Debug, Deserialize)]
struct Repository {
    full_name: String,
    description: Option<String>,
    topics: Vec<String>,
    html_url: String,
}

#[derive(Debug, Deserialize)]
struct RepositoryQueryResponse {
    items: Vec<Repository>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Project {
    name: String,
    description: Option<String>,
    topics: Vec<String>,
    link: String,
}

fn fetch_user_repositories(
    client: &reqwest::blocking::Client,
    token: &str,
    username: &str,
) -> Result<Vec<Repository>> {
    let query = format!("user:{}", username);
    let url = format!(
        "https://api.github.com/search/repositories?q={}&sort=updated&order=desc&per_page=5",
        urlencoding::encode(&query)
    );
    let response = client.get(&url)
        .header("Authorization", format!("Bearer {}", token))
        .header("Accept", "application/vnd.github+json")
        .header("X-GitHub-Api-Version", "2022-11-28")
        .header("User-Agent", "fetch-user-repositories")
        .send()
        .context("Failed to fetch repositories")?;
    if !response.status().is_success() {
        anyhow::bail!(
            "GitHub API request failed: {} {}",
            response.status(),
            response.text().unwrap_or_default()
        );
    }
    let repositories: RepositoryQueryResponse = response.json().context("Failed to parse repositories response")?;
    Ok(repositories.items)
}

fn transform_repository_data(repositories: Vec<Repository>) -> Vec<Project> {
    repositories.into_iter()
        .map(|repository| {
            // let tags = fetch_repository_tags(client, token, &repository.tag_url)?;
            // let tags = tags.into_iter().map(|tag| tag.name).collect();
            Project {
                name: repository.full_name,
                description: repository.description,
                topics: repository.topics,
                link: repository.html_url,
            }
        })
        .collect()
}

fn main() -> Result<()> {
    println!("Fetching OSS contributions...");

    let token = get_github_token()?;
    let client = reqwest::blocking::Client::new();

    let username = get_username(&client, &token)?;
    println!("Fetching PRs for user: {}", username);

    let repositories = fetch_user_repositories(&client, &token, &username)?;
    println!("Found {} repositories", repositories.len());

    let mut projects = transform_repository_data(repositories);
    println!("Found {} projects", projects.len());

    // Keep hand-written descriptions from data/recent-projects.json when GitHub has none.
    let existing: Vec<Project> = fs::read_to_string("data/recent-projects.json")
        .ok()
        .and_then(|s| serde_json::from_str(&s).ok())
        .unwrap_or_default();
    for p in &mut projects {
        if p.description.is_none() {
            p.description = existing
                .iter()
                .find(|e| e.link == p.link)
                .and_then(|e| e.description.clone());
        }
    }

    let prs = fetch_user_pull_requests(&client, &token, &username)?;
    println!("Found {} pull requests", prs.len());

    let contributions = transform_pr_data(prs);

    // Determine output path relative to project root
    let oss_contributions_output_path = PathBuf::from(env::current_dir()?)
        .join("data")
        .join("oss-contributions.json");
    let projects_output_path = PathBuf::from(env::current_dir()?)
        .join("data")
        .join("recent-projects.json");

    // Ensure data directory exists
    if let Some(parent) = oss_contributions_output_path.parent() {
        fs::create_dir_all(parent).context("Failed to create data directory")?;
    }
    if let Some(parent) = projects_output_path.parent() {
        fs::create_dir_all(parent).context("Failed to create data directory")?;
    }

    let oss_contributions_json = serde_json::to_string_pretty(&contributions)
        .context("Failed to serialize contributions")?;
    let projects_json = serde_json::to_string_pretty(&projects)
        .context("Failed to serialize projects")?;

    fs::write(&oss_contributions_output_path, oss_contributions_json).context("Failed to write output file")?;
    fs::write(&projects_output_path, projects_json).context("Failed to write output file")?;

    println!(
        "Successfully saved {} contributions to {}",
        contributions.len(),
        oss_contributions_output_path.display()
    );
    println!(
        "Successfully saved {} projects to {}",
        projects.len(),
        projects_output_path.display()
    );

    Ok(())
}
