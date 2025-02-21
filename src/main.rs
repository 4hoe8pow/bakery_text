mod bt_components;
mod bt_events;
mod bt_macros;
mod bt_resources;
mod bt_systems;
use bevy::{prelude::*, window::WindowMode};
use bt_resources::{financial_items::Wallet, market::Market, timers::WorldTimer};

use crate::{
    bt_components::bakery_terminal::*,
    bt_events::{emitation::Emitation, transportation::Transportation},
    bt_resources::forcused_section::*,
    bt_systems::{
        handle_inputs::*,
        install_systems::*,
        market_fluctuations::*,
        operate_baking::*,
        operate_cooling::*,
        operate_mixing::*,
        operate_packaging::*,
        operate_purchasing::*,
        operate_quality_control::*,
        operate_shaping::*,
        operate_stockroom::*,
        operate_waste_station::*,
        play_gauge::*,
        power_systems::*,
        transport::*,
    },
};

#[derive(States, Default, Debug, Clone, PartialEq, Eq, Hash)]
pub enum PausedState {
    #[default]
    Running,
    Paused,
}

fn main() {
    App::new()
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                resizable: false,
                mode: WindowMode::BorderlessFullscreen(MonitorSelection::Primary),
                ..default()
            }),
            ..default()
        }))
        .init_state::<PausedState>()
        .add_event::<Emitation>()
        .add_event::<Transportation>()
        .insert_resource(FocusedSection::default())
        .insert_resource(Wallet::default())
        .insert_resource(Market::default())
        .insert_resource(WorldTimer(Timer::from_seconds(3.0, TimerMode::Repeating)))
        .add_systems(Startup, (setup_camera, spawn_layout))
        .add_systems(
            Update,
            (
                update_market_prices,
                handle_text_input,
                handle_esc_key,
                switch_section,
                operate_purchasing,
                operate_baking,
                operate_mixing,
                operate_cooling,
                operate_packaging,
                operate_quality_control,
                operate_shaping,
                operate_stockroom,
                operate_waste_station,
                progress_gauge,
                transport,
            )
                .run_if(not(in_state(PausedState::Paused))),
        )
        .add_systems(PostUpdate, presenter)
        .add_systems(Update, ask_exit.run_if(in_state(PausedState::Paused)))
        .run();
}
