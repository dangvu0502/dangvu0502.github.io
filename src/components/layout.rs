use crate::components::Footer;
use crate::Route;
use dioxus::prelude::*;

#[component]
pub fn Layout() -> Element {
    rsx! {
        Outlet::<Route> {},
        Footer {},
    }
}
