use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::Stockroom,
    },
    bt_events::emitation::Emitation,
    impl_from_str,
};

#[derive(Debug)]
pub enum StockroomCommand {
    Store,
    Inventory,
}

impl_from_str!(StockroomCommand, Store => "store", Inventory => "inventory");

fn handle_stockroom_command(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<StockroomCommand>() {
        match cmd {
            StockroomCommand::Store => exec_store_st(terminal),
            StockroomCommand::Inventory => exec_inventory_st(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_general_in_st(input: &str, terminal: &mut BakeryTerminal) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_st(terminal),
            GeneralCommand::Ls => exec_ls_st(terminal),
            GeneralCommand::Mv => exec_mv_st(terminal),
            GeneralCommand::Shoo => exec_shoo_st(terminal),
        }
        let _ = terminal.submit_input();
    }
}

pub fn operate_stockroom(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode), With<Stockroom>>,
    mut events: EventReader<Emitation>,
) {
    for (mut terminal, mode) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_in_st(command, &mut terminal);
                handle_stockroom_command(command, &mut terminal);
            }
        }
        // ...existing code...
    }
}

fn exec_store_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Store command executed in Stockroom");
}

fn exec_inventory_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Inventory command executed in Stockroom");
}

fn exec_help_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Stockroom");
}

fn exec_ls_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Ls command executed in Stockroom");
}

fn exec_mv_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Stockroom");
}

fn exec_shoo_st(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Stockroom");
}
