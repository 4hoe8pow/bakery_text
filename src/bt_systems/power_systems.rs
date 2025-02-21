use bevy::{
    input::{keyboard::KeyboardInput, ButtonState},
    prelude::*,
};

use crate::{ModalComponet, PausedState};

pub fn handle_esc_key(
    mut evr_kbd: EventReader<KeyboardInput>,
    mut query: Query<(&ModalComponet, &mut Visibility, &mut Text)>,
    mut next_state: ResMut<NextState<PausedState>>,
) {
    for ev in evr_kbd.read() {
        if ev.state == ButtonState::Released {
            continue;
        }
        if ev.key_code == KeyCode::Escape {
            for (_, mut visibility, mut text) in query.iter_mut() {
                *visibility = Visibility::Visible;
                text.0 = "Do you want to exit the game?(y/n)".to_string();
            }
            next_state.set(PausedState::Paused);
        }
    }
}

pub fn ask_exit(
    mut evr_kbd: EventReader<KeyboardInput>,
    mut query: Query<(&ModalComponet, &mut Visibility, &mut Text)>,
    mut next_state: ResMut<NextState<PausedState>>,
    mut exit: EventWriter<AppExit>,
) {
    for ev in evr_kbd.read() {
        if ev.state == ButtonState::Released {
            continue;
        }
        match ev.key_code {
            KeyCode::KeyY => {
                exit.send(AppExit::Success);
            }
            KeyCode::KeyN => {
                for (_, mut visibility, _) in query.iter_mut() {
                    *visibility = Visibility::Hidden;
                }
                next_state.set(PausedState::Running);
            }
            _ => {}
        }
    }
}
