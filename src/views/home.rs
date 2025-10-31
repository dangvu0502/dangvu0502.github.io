use crate::components::{
    Hero, OSSContribution, OSSContributionsSection, ProjectsSection,
    WorkExperience, WorkExperienceSection, Project, RecentProjects, RecentProject,
};
use dioxus::prelude::*;

/// The Home page component that will be rendered when the current route is `[Route::Home]`
#[component]
pub fn Home() -> Element {
    // Recent projects data
    let recent_projects = vec![
        RecentProject {
            title: "Supavec".to_string(),
            description: "Open-source RAG platform using pgvector".to_string(),
            tags: vec![
                "#ai".to_string(),
                "#analytics".to_string(),
                "#opensource".to_string(),
            ],
            link: Some("https://github.com/yourusername/supavec".to_string()),
        },
        RecentProject {
            title: "MCP Server".to_string(),
            description: "MCP server streaming Supabase-secured RAG data to LLMs".to_string(),
            tags: vec![
                "#mcp".to_string(),
                "#ai".to_string(),
                "#openai".to_string(),
            ],
            link: Some("https://github.com/yourusername/mcp-server".to_string()),
        },
        RecentProject {
            title: "GitAnalytics".to_string(),
            description: "Supabase hackathon winning AI citation analytics app".to_string(),
            tags: vec![
                "#openai".to_string(),
                "#nextjs".to_string(),
            ],
            link: Some("https://github.com/yourusername/git-analytics".to_string()),
        },
    ];

    // Work experience data matching wireframe
    let work_experiences = vec![
        WorkExperience {
            company: "Supabase".to_string(),
            role: "Frontend Developer (contract)".to_string(),
            location: "Remote".to_string(),
            dates: "Jul 2025 - Sep 2025".to_string(),
            logo: Some("https://via.placeholder.com/40".to_string()),
            link: Some("https://github.com/supabase/supabase/pulls?q=author%3Ayourusername".to_string()),
        },
        WorkExperience {
            company: "Whispirit".to_string(),
            role: "Full Stack Developer (freelance)".to_string(),
            location: "Switzerland (Remote)".to_string(),
            dates: "Aug 2024 - Jan 2025".to_string(),
            logo: Some("https://via.placeholder.com/40".to_string()),
            link: None,
        },
        WorkExperience {
            company: "Semos".to_string(),
            role: "Full Stack 2nd Engineer (full-time)".to_string(),
            location: "Vancouver".to_string(),
            dates: "2020 - 2023".to_string(),
            logo: Some("https://via.placeholder.com/40".to_string()),
            link: None,
        },
        WorkExperience {
            company: "Yahoo! Japan".to_string(),
            role: "Software Developer (full-time)".to_string(),
            location: "Tokyo".to_string(),
            dates: "2015 - 2019".to_string(),
            logo: Some("https://via.placeholder.com/40".to_string()),
            link: None,
        },
        WorkExperience {
            company: "Stripe".to_string(),
            role: "Software Developer (intern)".to_string(),
            location: "San Francisco".to_string(),
            dates: "Apr 2021 - Jun 2021".to_string(),
            logo: Some("https://via.placeholder.com/40".to_string()),
            link: None,
        },
    ];

    // OSS contributions data matching wireframe
    let oss_contributions = vec![
        OSSContribution {
            repository: "langchain-ai/langchain-community".to_string(),
            pr_number: "1137".to_string(),
            link: Some("https://github.com/langchain-ai/langchain-community/pull/1137".to_string()),
        },
        OSSContribution {
            repository: "verblwala/stripe-docs".to_string(),
            pr_number: "130".to_string(),
            link: Some("https://github.com/verblwala/stripe-docs/pull/130".to_string()),
        },
        OSSContribution {
            repository: "vercel/next.js".to_string(),
            pr_number: "56922".to_string(),
            link: Some("https://github.com/vercel/next.js/pull/56922".to_string()),
        },
        OSSContribution {
            repository: "supabase/supabase".to_string(),
            pr_number: "110009".to_string(),
            link: Some("https://github.com/supabase/supabase/pull/110009".to_string()),
        },
        OSSContribution {
            repository: "mdouk/labs/modal-examples".to_string(),
            pr_number: "140".to_string(),
            link: Some("https://github.com/mdouk/labs/modal-examples/pull/140".to_string()),
        },
        OSSContribution {
            repository: "nuxt/docs".to_string(),
            pr_number: "1799".to_string(),
            link: Some("https://github.com/nuxt/docs/pull/1799".to_string()),
        },
        OSSContribution {
            repository: "nuxt/docs".to_string(),
            pr_number: "1737".to_string(),
            link: Some("https://github.com/nuxt/docs/pull/1737".to_string()),
        },
        OSSContribution {
            repository: "nodejs/node".to_string(),
            pr_number: "24583".to_string(),
            link: Some("https://github.com/nodejs/node/pull/24583".to_string()),
        },
    ];

    let projects = vec![
        Project {
            name: "Supavec".to_string(),
            description: "The open source RAG platform".to_string(),
            link: Some("https://github.com/yourusername/supavec".to_string()),
        },
        Project {
            name: "@supavec/mcp-server".to_string(),
            description: "MCP server for Supavec".to_string(),
            link: Some("https://github.com/yourusername/mcp-server".to_string()),
        },
        Project {
            name: "@supavec/supabase-ai".to_string(),
            description: "TypeScript SDK for building RAG applications with Supabase + OpenAI".to_string(),
            link: Some("https://github.com/yourusername/supabase-ai".to_string()),
        },
        Project {
            name: "ChatStage".to_string(),
            description: "An OSS ChatGPT alternative".to_string(),
            link: Some("https://github.com/yourusername/chatstage".to_string()),
        },
        Project {
            name: "ClickAnalytics".to_string(),
            description: "Track citations of your website by AI".to_string(),
            link: Some("https://github.com/yourusername/click-analytics".to_string()),
        },
    ];

    rsx! {
        Hero {},
        RecentProjects { recent_projects: recent_projects },
        WorkExperienceSection { experiences: work_experiences },
        OSSContributionsSection { contributions: oss_contributions },
        ProjectsSection { projects: projects }
    }
}
