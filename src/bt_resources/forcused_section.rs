use bevy::prelude::*;

/// ID of the currently focused BakeryTerminal
#[derive(Resource, Default)]
pub struct FocusedSection(pub u8);

impl FocusedSection {
    /// インクリメント（最大 11 でループ）
    pub fn increment(&mut self) {
        self.0 = (self.0 + 1) % 12;
    }

    /// デクリメント（最小 0 でループ）
    pub fn decrement(&mut self) {
        if self.0 == 0 {
            self.0 = 11;
        } else {
            self.0 -= 1;
        }
    }
}
