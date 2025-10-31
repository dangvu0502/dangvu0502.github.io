use dioxus::prelude::*;

#[component] 
pub fn Footer() -> Element {
    // Get current year
    let year = 2025; // In a real app, you'd get this from chrono or similar

    rsx! {
        footer {
            class: "py-12 md:py-16 text-center",

            div {
                class: "max-w-[1200px] mx-auto px-5 md:px-8",

                p {
                    class: "text-[#6b7280] text-sm",
                    "Matt B © {year}"
                }
            }
        }
    }
}