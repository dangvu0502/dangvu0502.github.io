use dioxus::prelude::*;

#[component]
pub fn Hero() -> Element {
    rsx! {
        header {
            class: "py-12 md:py-16 border-b border-[#1f1f1f]",

            div {
                class: "max-w-[1200px] mx-auto px-5 md:px-8",

                // Avatar and Social Icons
                div {
                    class: "flex flex-col md:flex-row justify-between items-center gap-6 md:gap-5 mb-10 md:mb-12",

                    // Avatar
                    img {
                        src: "https://via.placeholder.com/80",
                        alt: "Matt Dangvu's avatar",
                        class: "w-20 h-20 rounded-full border-2 border-[#c46846] object-cover"
                    }

                    // Social Icons
                    div {
                        class: "flex gap-3 md:gap-4",

                        a {
                            href: "https://twitter.com/yourusername",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            aria_label: "Twitter",
                            class: "w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300",
                            "𝕏"
                        }

                        a {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            aria_label: "Lightning",
                            class: "w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300",
                            "⚡"
                        }

                        a {
                            href: "https://linkedin.com/in/yourusername",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            aria_label: "LinkedIn",
                            class: "w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300",
                            "💼"
                        }

                        a {
                            href: "mailto:your.email@example.com",
                            aria_label: "Email",
                            class: "w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300",
                            "📧"
                        }

                        a {
                            href: "#",
                            aria_label: "Shop",
                            class: "w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-lg hover:bg-[#2a2a2a] hover:border-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300",
                            "🛒"
                        }
                    }
                }

                // Bio Section
                div {
                    class: "mb-8",

                    p {
                        class: "mb-4 text-base leading-relaxed",
                        dangerous_inner_html: "I'm <strong>Matt Dangvu</strong>, a fullstack developer and solofounder based in Japan and Canada."
                    }

                    p {
                        class: "mb-4 text-base leading-relaxed",
                        "Building performant, AI-powered web experiences with modern frameworks. Currently exploring Rust and WebAssembly."
                    }

                    a {
                        href: "#contact",
                        class: "inline-block mt-2.5 px-4 py-2 bg-[#c46846] text-white rounded-md font-medium hover:bg-[#b85a38] transition-colors duration-300",
                        "Hire me 🚀"
                    }
                }
            }
        }
    }
}
