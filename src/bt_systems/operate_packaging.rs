use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::Packaging,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum PackagingCommand {
    Pack,
    Label,
}

impl_from_str!(PackagingCommand, Pack => "pack", Label => "label");

fn handle_packaging_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<PackagingCommand>() {
        match cmd {
            PackagingCommand::Pack => exec_pack_pg(terminal),
            PackagingCommand::Label => exec_label_pg(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_pg(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_pg(terminal),
            GeneralCommand::Ls => exec_ls_pg(terminal),
            GeneralCommand::Mv => exec_mv_pg(terminal),
            GeneralCommand::Shoo => exec_shoo_pg(terminal),
        }
        let _ = terminal.submit_input();
    }
}

pub fn operate_packaging(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode), With<Packaging>>,
    mut events: EventReader<Emitation>,
) {
    for (mut terminal, mode) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_in_pg(command, &mut terminal);
                handle_packaging_command(command, &mut terminal);
            }
        }
        // ...existing code...
    }
}

fn exec_pack_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Pack command executed in Packaging");
}

fn exec_label_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Label command executed in Packaging");
}

fn exec_help_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Packaging");
}

fn exec_ls_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Ls command executed in Packaging");
}

fn exec_mv_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Packaging");
}

fn exec_shoo_pg(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Packaging");
}
