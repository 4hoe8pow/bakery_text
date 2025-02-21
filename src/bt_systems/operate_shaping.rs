use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode, Repository},
        sections::Shaping,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum ShapingCommand {
    Div,
    Roll,
}

pub fn operate_shaping(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode, &Repository), With<Shaping>>,
    mut events: EventReader<Emitation>,
) {
    if let Ok((mut terminal, OperatorMode::Commander, repository)) = query.get_single_mut() {
        for ev in events.read() {
            let (command, opt1, opt2) = ev.split_command();
            handle_general_in_sh(command, &mut terminal, repository);
            handle_shaping_command(command, &mut terminal);
        }
    }
}

impl_from_str!(ShapingCommand, Div => "div", Roll => "roll");

fn handle_shaping_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<ShapingCommand>() {
        match cmd {
            ShapingCommand::Div => exec_div_sh(terminal),
            ShapingCommand::Roll => exec_roll_sh(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_sh(input: &str, terminal: &mut BakeryTerminal, repository: &Repository) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_sh(terminal),
            GeneralCommand::Ls => exec_ls_sh(terminal, repository),
            GeneralCommand::Mv => exec_mv_sh(terminal),
            GeneralCommand::Shoo => exec_shoo_sh(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn exec_div_sh(terminal: &mut BakeryTerminal) {
    terminal.add_input("Div command executed in Shaping");
}

fn exec_roll_sh(terminal: &mut BakeryTerminal) {
    terminal.add_input("Roll command executed in Shaping");
}

fn exec_help_sh(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Shaping");
}

fn exec_ls_sh(terminal: &mut BakeryTerminal, repository: &Repository) {
    terminal.add_input(&format!("Repository contents:\n{}", repository));
}

fn exec_mv_sh(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Shaping");
}

fn exec_shoo_sh(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Shaping");
}
