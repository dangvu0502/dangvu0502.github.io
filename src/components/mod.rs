//! The components module contains all shared components for our app. Components are the building blocks of dioxus apps.
//! They can be used to defined common UI elements like buttons, forms, and modals. In this template, we define a Hero
//! component  to be used in our app.

mod hero;
pub use hero::Hero;

mod layout;
pub use layout::Layout;

mod footer;
pub use footer::Footer;

mod recent_project_card;
pub use recent_project_card::{RecentProject, RecentProjectCard};

mod recent_projects;
pub use recent_projects::RecentProjects;

mod work_experience;
pub use work_experience::{WorkExperience, WorkExperienceSection};

mod oss_contributions;
pub use oss_contributions::{OSSContribution, OSSContributionsSection};

mod projects;
pub use projects::{Project, ProjectsSection};