use dioxus::prelude::*;


#[derive(Clone, PartialEq, Props)]
pub struct RecentProject {
    pub title: String,
    pub description: String,
    pub tags: Vec<String>,
    pub link: Option<String>,
}

#[component]
pub fn RecentProjectCard(recent_project: RecentProject) -> Element {
    let card_element = if let Some(link) = &recent_project.link {
        rsx! {
            a {
                href: "{link}",
                target: "_blank",
                rel: "noopener noreferrer",
                class: "bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 block focus:outline-none focus:ring-2 focus:ring-[#c46846] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]",

                h3 {
                    class: "text-[#c46846] text-lg mb-3 font-semibold",
                    "{recent_project.title}"
                }

                div {
                    class: "flex flex-wrap gap-2 mb-3",
                    for tag in recent_project.tags.iter() {
                        span {
                            class: "bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded text-xs text-[#9ca3af]",
                            "{tag}"
                        }
                    }
                }

                p {
                    class: "text-[#b0b0b0] text-sm leading-relaxed",
                    "{recent_project.description}"
                }
            }
        }
    } else {
        rsx! {
            div {
                class: "bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 transition-all duration-300 block",

                h3 {
                    class: "text-[#c46846] text-lg mb-3 font-semibold",
                    "{recent_project.title}"
                }

                div {
                    class: "flex flex-wrap gap-2 mb-3",
                    for tag in recent_project.tags.iter() {
                        span {
                            class: "bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded text-xs text-[#9ca3af]",
                            "{tag}"
                        }
                    }
                }

                p {
                    class: "text-[#b0b0b0] text-sm leading-relaxed",
                    "{recent_project.description}"
                }
            }
        }
    };

    card_element
}