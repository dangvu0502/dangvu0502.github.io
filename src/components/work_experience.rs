use dioxus::prelude::*;
use serde::Deserialize;

#[derive(Clone, PartialEq, Props, Deserialize)]
pub struct WorkExperience {
    pub company: String,
    pub company_site: Option<String>,
    pub role: String,
    pub location: String,
    pub dates: String,
    pub logo: Option<String>,
}

impl WorkExperience {
    pub fn from_json() -> Vec<WorkExperience> {
        const WORK_EXPERIENCES_DATA: &str = include_str!("../../data/work-experience.json");
        serde_json::from_str(WORK_EXPERIENCES_DATA).unwrap_or_else(|e| {
            eprintln!("Failed to parse work experiences: {}", e);
            vec![]
        })
    }
}

#[component]
pub fn WorkExperienceSection(experiences: Vec<WorkExperience>) -> Element {
    rsx! {
        section {
            id: "work",
            class: "py-12 md:py-20 border-b border-[#1f1f1f]",

            div {
                class: "max-w-[1200px] mx-auto px-5 md:px-8",

                h2 {
                    class: "text-2xl md:text-3xl text-white font-bold mb-8 md:mb-10",
                    "Work Experience"
                }

                div {
                    class: "flex flex-col gap-5",

                    for experience in experiences {
                        WorkExperienceItem { experience: experience }
                    }
                }
            }
        }
    }
}

#[component]
fn WorkExperienceItem(experience: WorkExperience) -> Element {
    let logo_dir = asset!("/assets/logo");
    let logo = experience.logo.map(|logo| format!("{logo_dir}/{logo}"));

    rsx! {
       a {
        href: if let Some(company_site) = &experience.company_site { company_site.to_string() } else { "#".to_string() },
        target: "_blank",
        rel: "noopener noreferrer",
        div {
            class: "grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-5 items-center bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors duration-300",

            // Company Logo
            div {
                class: "w-full h-full rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center",

                if let Some(logo) = logo {
                    img {
                        src: "{logo}",
                        alt: "{experience.company} logo",
                        class: "w-full h-full bg-white"
                    }
                } else {
                    div {
                        class: "text-[#9ca3af] text-xs font-bold",
                        {experience.company.chars().take(2).collect::<String>().to_uppercase()}
                    }
                }
            }

            // Job Details
            div {
                h3 {
                    class: "text-white text-lg font-semibold mb-1",
                    "{experience.company}"
                }

                p {
                    class: "text-[#9ca3af] text-sm mb-1",
                    "{experience.role} - {experience.location}"
                }

            }

            // Dates
            div {
                class: "text-[#6b7280] text-sm whitespace-nowrap text-left md:text-right",
                "{experience.dates}"
            }
        }
       }
    }
}
