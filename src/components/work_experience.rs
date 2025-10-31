use dioxus::prelude::*;

#[derive(Clone, PartialEq, Props)]
pub struct WorkExperience {
    pub company: String,
    pub role: String,
    pub location: String,
    pub dates: String,
    pub logo: Option<String>,
    pub link: Option<String>,
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
    rsx! {
        div {
            class: "grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-5 items-center bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors duration-300",

            // Company Logo
            div {
                class: "w-10 h-10 rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center",

                if let Some(logo) = &experience.logo {
                    img {
                        src: "{logo}",
                        alt: "{experience.company} logo",
                        class: "w-full h-full object-cover"
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

                if let Some(link) = &experience.link {
                    a {
                        href: "{link}",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "text-[#c46846] text-sm hover:text-[#d17a5a] transition-colors",
                        "Here are my PRs →"
                    }
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
