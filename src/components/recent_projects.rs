use dioxus::prelude::*;
use crate::components::recent_project_card::{RecentProject, RecentProjectCard};

#[component]
pub fn RecentProjects(recent_projects: Vec<RecentProject>) -> Element {

    rsx! {
        section {
            id: "projects",
            class: "py-12 md:py-20 border-b border-[#1f1f1f]",

            div {
                class: "max-w-[1200px] mx-auto px-5 md:px-8",

                // Section Title
                h2 {
                    class: "text-2xl md:text-3xl font-bold text-white mb-10",
                    "Recent Projects"
                }

                // Projects Grid
                div {
                    class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6",

                    for recent_project in recent_projects {
                        RecentProjectCard {
                            recent_project: recent_project
                        }
                    }
                }
            }
        }
    }
}
