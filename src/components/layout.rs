use crate::components::{Footer, Navbar};
use crate::Route;
use dioxus::prelude::*;

#[component]
pub fn Layout() -> Element {
    rsx! {
        Navbar {},
        Outlet::<Route> {},
        Footer {},
    }
}
