use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode, Repository},
        sections::Cooling,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum CoolingCommand {
    Proof,
    Cool,
}

pub fn operate_cooling(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode, &Repository), With<Cooling>>,
    mut events: EventReader<Emitation>,
) {
    if let Ok((mut terminal, OperatorMode::Commander, repository)) = query.get_single_mut() {
        for ev in events.read() {
            let (command, opt1, opt2) = ev.split_command();
            handle_general_in_cl(command, &mut terminal, repository);
            handle_cooling_command(command, &mut terminal);
        }
    }
}

impl_from_str!(CoolingCommand, Proof => "proof", Cool => "cool");

fn handle_cooling_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<CoolingCommand>() {
        match cmd {
            CoolingCommand::Proof => exec_proof_cl(terminal),
            CoolingCommand::Cool => exec_cool_cl(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_cl(input: &str, terminal: &mut BakeryTerminal, repository: &Repository) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_cl(terminal),
            GeneralCommand::Ls => exec_ls_cl(terminal, repository),
            GeneralCommand::Mv => exec_mv_cl(terminal),
            GeneralCommand::Shoo => exec_shoo_cl(terminal),
        }
        let _ = terminal.submit_input();
    }
}
fn exec_proof_cl(terminal: &mut BakeryTerminal) {
    terminal.add_input("Proof command executed in Cooling");
}

fn exec_cool_cl(terminal: &mut BakeryTerminal) {
    terminal.add_input("Cool command executed in Cooling");
}

fn exec_help_cl(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Cooling");
}

fn exec_ls_cl(terminal: &mut BakeryTerminal, repository: &Repository) {
    terminal.add_input(&format!("Repository contents:\n{}", repository));
}

fn exec_mv_cl(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Cooling");
}

fn exec_shoo_cl(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Cooling");
}
