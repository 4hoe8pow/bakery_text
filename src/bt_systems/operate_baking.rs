use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::Baking,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum BakingCommand {
    Bake,
}

impl_from_str!(BakingCommand, Bake => "bake");

fn handle_baking_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<BakingCommand>() {
        match cmd {
            BakingCommand::Bake => exec_bake_bk(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_bk(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_bk(terminal),
            GeneralCommand::Ls => exec_ls_bk(terminal),
            GeneralCommand::Mv => exec_mv_bk(terminal),
            GeneralCommand::Shoo => exec_shoo_bk(terminal),
        }
        let _ = terminal.submit_input();
    }
}

pub fn operate_baking(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode), With<Baking>>,
    mut events: EventReader<Emitation>,
) {
    for (mut terminal, mode) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_in_bk(command, &mut terminal);
                handle_baking_command(command, &mut terminal);
            }
        }
        // ...existing code...
    }
}

fn exec_bake_bk(terminal: &mut BakeryTerminal) {
    terminal.add_input("Bake command executed in Baking");
}

fn exec_help_bk(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Baking");
}

fn exec_ls_bk(terminal: &mut BakeryTerminal) {
    terminal.add_input("Ls command executed in Baking");
}

fn exec_mv_bk(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Baking");
}

fn exec_shoo_bk(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Baking");
}
