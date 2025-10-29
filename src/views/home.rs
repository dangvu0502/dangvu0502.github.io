use crate::components::{Hero, ProjectCard};
use dioxus::prelude::*;

/// The Home page component that will be rendered when the current route is `[Route::Home]`
#[component]
pub fn Home() -> Element {
    rsx! {
        Hero {},
        ProjectCard {}
    }
}
