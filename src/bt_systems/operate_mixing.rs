use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode, Repository},
        sections::Mixing,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum MixingCommand {
    Add,
    Mix,
}

pub fn operate_mixing(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode, &Repository), With<Mixing>>,
    mut events: EventReader<Emitation>,
) {
    if let Ok((mut terminal, OperatorMode::Commander, repository)) = query.get_single_mut() {
        for ev in events.read() {
            let (command, opt1, opt2) = ev.split_command();
            handle_general_in_mx(command, &mut terminal, repository);
            handle_mixing_command(command, &mut terminal);
        }
    }
}

impl_from_str!(MixingCommand, Add => "add", Mix => "mix");

fn handle_mixing_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<MixingCommand>() {
        match cmd {
            MixingCommand::Add => exec_add_mx(terminal),
            MixingCommand::Mix => exec_mix_mx(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_mx(input: &str, terminal: &mut BakeryTerminal, repository: &Repository) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_mx(terminal),
            GeneralCommand::Ls => exec_ls_mx(terminal, repository),
            GeneralCommand::Mv => exec_mv_mx(terminal),
            GeneralCommand::Shoo => exec_shoo_mx(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn exec_add_mx(terminal: &mut BakeryTerminal) {
    terminal.add_input("Add command executed in Mixing");
}

fn exec_mix_mx(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mix command executed in Mixing");
}

fn exec_help_mx(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Mixing");
}

fn exec_ls_mx(terminal: &mut BakeryTerminal, repository: &Repository) {
    terminal.add_input(&format!("Repository contents:\n{}", repository));
}

fn exec_mv_mx(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Mixing");
}

fn exec_shoo_mx(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Mixing");
}
