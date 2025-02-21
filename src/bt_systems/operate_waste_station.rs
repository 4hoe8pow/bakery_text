use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::WasteStation,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum WasteStationCommand {
    Dispose,
}

impl_from_str!(WasteStationCommand, Dispose => "dispose");

fn handle_waste_station_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<WasteStationCommand>() {
        match cmd {
            WasteStationCommand::Dispose => exec_dispose_wt(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_wt(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_wt(terminal),
            GeneralCommand::Ls => exec_ls_wt(terminal),
            GeneralCommand::Mv => exec_mv_wt(terminal),
            GeneralCommand::Shoo => exec_shoo_wt(terminal),
        }
        let _ = terminal.submit_input();
    }
}

pub fn operate_waste_station(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode), With<WasteStation>>,
    mut events: EventReader<Emitation>,
) {
    for (mut terminal, mode) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_in_wt(command, &mut terminal);
                handle_waste_station_command(command, &mut terminal);
            }
        }
        // ...existing code...
    }
}

fn exec_dispose_wt(terminal: &mut BakeryTerminal) {
    terminal.add_input("Dispose command executed in Waste Station");
}

fn exec_help_wt(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Waste Station");
}

fn exec_ls_wt(terminal: &mut BakeryTerminal) {
    terminal.add_input("Ls command executed in Waste Station");
}

fn exec_mv_wt(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Waste Station");
}

fn exec_shoo_wt(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Waste Station");
}
