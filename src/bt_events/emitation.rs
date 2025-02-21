use bevy::prelude::*;

#[derive(Event)]
pub struct Emitation(pub String, pub u8);

impl Emitation {
    pub fn split_command(&self) -> (&str, Option<&str>, Option<&str>) {
        let parts: Vec<&str> = self.0.split('_').collect();
        let command = parts.first().unwrap_or(&"");
        let opt1 = parts.get(1).copied();
        let opt2 = parts.get(2).copied();
        (command, opt1, opt2)
    }
}
