use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::QualityControl,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum QualityControlCommand {
    Inspect,
    Approve,
}

impl_from_str!(QualityControlCommand, Inspect => "inspect", Approve => "approve");

fn handle_quality_control_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<QualityControlCommand>() {
        match cmd {
            QualityControlCommand::Inspect => exec_inspect_qc(terminal),
            QualityControlCommand::Approve => exec_approve_qc(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_qc(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_qc(terminal),
            GeneralCommand::Ls => exec_ls_qc(terminal),
            GeneralCommand::Mv => exec_mv_qc(terminal),
            GeneralCommand::Shoo => exec_shoo_qc(terminal),
        }
        let _ = terminal.submit_input();
    }
}

pub fn operate_quality_control(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode), With<QualityControl>>,
    mut events: EventReader<Emitation>,
) {
    for (mut terminal, mode) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_qc(command, &mut terminal);
                handle_quality_control_command(command, &mut terminal);
            }
        }
    }
}

fn exec_inspect_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Inspect command executed in Quality Control");
}

fn exec_approve_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Approve command executed in Quality Control");
}

fn exec_help_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Quality Control");
}

fn exec_ls_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Ls command executed in Quality Control");
}

fn exec_mv_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Quality Control");
}

fn exec_shoo_qc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Quality Control");
}
