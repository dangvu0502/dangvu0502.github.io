//! The components module contains all shared components for our app. Components are the building blocks of dioxus apps.
//! They can be used to defined common UI elements like buttons, forms, and modals. In this template, we define a Hero
//! component  to be used in our app.

mod hero;
pub use hero::Hero;

mod navbar;
pub use navbar::Navbar;

mod layout;
pub use layout::Layout;

mod footer;
pub use footer::Footer;

mod project_card;
pub use project_card::ProjectCard;