use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode},
        sections::Purchasing,
    },
    bt_events::{emitation::Emitation, transportation::Transportation},
    bt_resources::{
        financial_items::Wallet,
        market::{Ingredient, Market},
    },
    impl_from_str,
    Gauge,
    Repository,
};

const MSG_MISSING_INGREDIENT_OR_QUANTITY: &str =
    "Order command failed: missing ingredient name or quantity.";
const MSG_INVALID_INGREDIENT_NAME: &str = "Order command failed: invalid ingredient name.";
const MSG_INVALID_OR_NON_POSITIVE_QUANTITY: &str =
    "Order command failed: invalid or non-positive quantity.";
const MSG_NOT_ENOUGH_STOCK: &str = "Order command failed: not enough stock.";
const MSG_NOT_ENOUGH_CASH: &str = "Order command failed: not enough cash.";

#[derive(Debug)]
pub enum PurchasingCommand {
    Order,
}

impl_from_str!(PurchasingCommand, Order => "od");

pub fn operate_purchasing(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode, &mut Gauge), With<Purchasing>>,
    mut events: EventReader<Emitation>,
    mut market: ResMut<Market>,
    mut wallet: ResMut<Wallet>,
    mut transportation_events: EventWriter<Transportation>,
) {
    for (mut terminal, mode, mut gauge) in query.iter_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_pc(command, &mut terminal, &format!("{}", *market));
                handle_purchasing_command(
                    command,
                    &mut terminal,
                    &mut market,
                    &mut wallet,
                    opt1,
                    opt2,
                    &mut transportation_events,
                    &mut gauge,
                )
            }
        }
    }
}

fn handle_general_pc(input: &str, terminal: &mut BakeryTerminal, market_status: &str) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_pc(terminal),
            GeneralCommand::Ls => exec_ls_pc(terminal, market_status),
            GeneralCommand::Mv => exec_mv_pc(terminal),
            GeneralCommand::Shoo => exec_shoo_pc(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn handle_purchasing_command(
    input: &str,
    terminal: &mut BakeryTerminal,
    market: &mut Market,
    wallet: &mut Wallet,
    opt1: Option<&str>,
    opt2: Option<&str>,
    events: &mut EventWriter<Transportation>,
    gauge: &mut Gauge,
) {
    if let Ok(cmd) = input.parse::<PurchasingCommand>() {
        match cmd {
            PurchasingCommand::Order => {
                let _ = exec_order_pc(terminal, market, wallet, opt1, opt2, events, gauge);
                let _ = terminal.submit_input();
            }
        }
    }
}

fn exec_order_pc(
    terminal: &mut BakeryTerminal,
    market: &mut Market,
    wallet: &mut Wallet,
    opt1: Option<&str>,
    opt2: Option<&str>,
    events: &mut EventWriter<Transportation>,
    gauge: &mut Gauge,
) -> Result<(), ()> {
    let (ingredient_str, quantity_str) = match (opt1, opt2) {
        (Some(ing), Some(qty)) => (ing, qty),
        _ => {
            terminal.add_input(MSG_MISSING_INGREDIENT_OR_QUANTITY);
            return Err(());
        }
    };

    let ingredient = ingredient_str.parse::<Ingredient>().map_err(|_| {
        terminal.add_input(MSG_INVALID_INGREDIENT_NAME);
    })?;

    let quantity: f32 = quantity_str
        .parse()
        .map_err(|_| {
            terminal.add_input(MSG_INVALID_OR_NON_POSITIVE_QUANTITY);
        })
        .and_then(|qty| if qty > 0.0 { Ok(qty) } else { Err(()) })?;

    let cost = market.calculate_cost(&ingredient, quantity);
    if market.purchase(&ingredient, quantity).is_err() {
        terminal.add_input(MSG_NOT_ENOUGH_STOCK);
        return Err(());
    }

    if wallet.deduct_cash(cost as f64).is_err() {
        market.restock(ingredient, quantity); // ロールバック
        terminal.add_input(MSG_NOT_ENOUGH_CASH);
        return Err(());
    }

    // 8秒ゲージ
    gauge.start_timer(8.);

    // 購入した原料がpantryのリポジトリへ補充されるTransportation eventを発出
    events.send(Transportation {
        from_term_id: terminal.id,
        to_term_id: 1u8,                  // PantryのID
        pack: Repository::new_raw_only(), // 仮のRepositoryを使用
    });

    terminal.add_input(&format!(
        "Order command executed: {:?} x{} for {:.2} cash.",
        ingredient, quantity, cost
    ));
    Ok(())
}

fn exec_help_pc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed.");
}

fn exec_ls_pc(terminal: &mut BakeryTerminal, market_status: &str) {
    terminal.add_input(market_status);
}

fn exec_mv_pc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command not available in Purchasing.");
}

fn exec_shoo_pc(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed.");
}
