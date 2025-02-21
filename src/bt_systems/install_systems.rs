use std::time::Duration;

use bevy::{color::palettes::css::*, prelude::*};

use crate::bt_components::{
    bakery_terminal::{BakeryTerminal, Gauge, ModalComponet, OperatorMode, Repository},
    sections::*,
};
const FONT_SIZE: f32 = 19.5;

pub fn setup_camera(mut cmd: Commands) {
    cmd.spawn(Camera2d);
}

pub fn spawn_layout(mut cmd: Commands, asset_server: Res<AssetServer>) {
    let font_teko = asset_server.load("fonts/Teko/Teko-Regular.ttf");
    let icon_ps = asset_server.load("img/icons/ps.png");
    let icon_pn = asset_server.load("img/icons/pn.png");
    let icon_mx = asset_server.load("img/icons/mx.png");
    let icon_cl = asset_server.load("img/icons/cl.png");
    let icon_sh = asset_server.load("img/icons/sh.png");
    let icon_bk = asset_server.load("img/icons/bk.png");
    let icon_pk = asset_server.load("img/icons/pk.png");
    let icon_qc = asset_server.load("img/icons/qc.png");
    let icon_st = asset_server.load("img/icons/st.png");
    let icon_sf = asset_server.load("img/icons/sf.png");
    let icon_ws = asset_server.load("img/icons/ws.png");
    let icon_ut = asset_server.load("img/icons/ut.png");

    cmd.spawn((
        Node {
            display: Display::Grid,
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            grid_template_columns: vec![GridTrack::min_content(), GridTrack::flex(1.0)],
            grid_template_rows: vec![GridTrack::flex(1.), GridTrack::percent(5.)],

            ..default()
        },
        BackgroundColor(Color::srgb_u8(3, 11, 3)),
    ))
    .with_children(|builder| {
        builder
            .spawn((
                Node {
                    height: Val::Percent(100.0),
                    aspect_ratio: Some(1.414),
                    display: Display::Grid,
                    padding: UiRect::all(Val::Px(16.0)),
                    grid_template_columns: RepeatedGridTrack::flex(4, 1.),
                    grid_template_rows: RepeatedGridTrack::flex(3, 1.),
                    row_gap: Val::Px(10.0),
                    column_gap: Val::Px(10.0),
                    ..default()
                },
                BackgroundColor(Color::srgb(0.25, 0.25, 0.25)),
            ))
            .with_children(|builder| {
                // Purchasing
                add_section(
                    builder,
                    0,
                    None,
                    OperatorMode::Commander,
                    Purchasing,
                    font_teko.clone(),
                    icon_ps.clone(),
                );
                // Pantry
                add_section(
                    builder,
                    1,
                    Some(Repository::new_raw_only()),
                    OperatorMode::default(),
                    Pantry,
                    font_teko.clone(),
                    icon_pn.clone(),
                );
                // Mixing
                add_section(
                    builder,
                    2,
                    Some(Repository::new_raw_with_dough()),
                    OperatorMode::default(),
                    Mixing,
                    font_teko.clone(),
                    icon_mx.clone(),
                );
                // Cooling
                add_section(
                    builder,
                    3,
                    Some(Repository::new_all()),
                    OperatorMode::default(),
                    Cooling,
                    font_teko.clone(),
                    icon_cl.clone(),
                );
                // Shaping
                add_section(
                    builder,
                    4,
                    Some(Repository::new_dough_with_bread()),
                    OperatorMode::default(),
                    Shaping,
                    font_teko.clone(),
                    icon_sh.clone(),
                );
                // Baking
                add_section(
                    builder,
                    5,
                    Some(Repository::new_bread_only()),
                    OperatorMode::default(),
                    Baking,
                    font_teko.clone(),
                    icon_bk.clone(),
                );
                // Packaging
                add_section(
                    builder,
                    6,
                    Some(Repository::new_bread_only()),
                    OperatorMode::default(),
                    Packaging,
                    font_teko.clone(),
                    icon_pk.clone(),
                );
                // Quality Control
                add_section(
                    builder,
                    7,
                    Some(Repository::new_bread_only()),
                    OperatorMode::default(),
                    QualityControl,
                    font_teko.clone(),
                    icon_qc.clone(),
                );
                // Stockroom
                add_section(
                    builder,
                    8,
                    Some(Repository::new_bread_only()),
                    OperatorMode::default(),
                    Stockroom,
                    font_teko.clone(),
                    icon_st.clone(),
                );
                // Sales Front
                add_section(
                    builder,
                    9,
                    Some(Repository::new_bread_only()),
                    OperatorMode::default(),
                    SalesFront,
                    font_teko.clone(),
                    icon_sf.clone(),
                );
                // Waste Station
                add_section(
                    builder,
                    10,
                    None,
                    OperatorMode::default(),
                    WasteStation,
                    font_teko.clone(),
                    icon_ws.clone(),
                );
                // Utility
                add_section(
                    builder,
                    11,
                    None,
                    OperatorMode::default(),
                    Utility,
                    font_teko.clone(),
                    icon_ut.clone(),
                );
            });

        // Thread bar
        builder.spawn((
            Node {
                grid_column: GridPlacement::span(1),
                ..default()
            },
            BackgroundColor(GREY.into()),
        ));
        // Status bar
        builder.spawn((
            Node {
                grid_column: GridPlacement::span(2),
                ..default()
            },
            BackgroundColor(WHITE.into()),
        ));

        // Modal
        builder.spawn((
            Node {
                position_type: PositionType::Absolute,
                margin: UiRect {
                    top: Val::Auto,
                    bottom: Val::Auto,
                    left: Val::Auto,
                    right: Val::Auto,
                },
                width: Val::Percent(40.),
                height: Val::Percent(20.),
                ..default()
            },
            Text::default(),
            TextColor(Color::BLACK),
            ModalComponet,
            Visibility::Hidden,
            BackgroundColor(Color::WHITE.with_alpha(0.3)),
        ));
    });
}

fn add_section(
    builder: &mut ChildBuilder,
    section_id: u8,
    repository: Option<Repository>,
    operator_mode: OperatorMode,
    section: impl Component + Section,
    font_teko: Handle<Font>,
    icon: Handle<Image>,
) {
    let help_text = "Type 'help'".to_string();

    builder
        .spawn((
            Node {
                display: Display::Flex,
                flex_direction: FlexDirection::ColumnReverse,
                overflow: Overflow::scroll(),
                padding: UiRect::all(Val::Px(3.0)),
                ..default()
            },
            ImageNode {
                image: icon,
                ..default()
            },
            BackgroundColor(Color::srgb_u8(210, 210, 210)),
            BorderRadius::all(Val::Px(12.)),
        ))
        .with_children(|builder| {
            builder.spawn((
                BorderRadius::all(Val::Px(20.)),
                Node {
                    flex_grow: 1.0,
                    ..default()
                },
                BackgroundColor(Color::srgba_u8(10, 10, 10, 110)),
                Text::default(),
                TextFont {
                    font: font_teko.clone(),
                    font_size: FONT_SIZE,
                    ..default()
                },
                TextColor(Color::WHITE),
                TextLayout::new(JustifyText::Left, LineBreak::AnyCharacter),
                BakeryTerminal {
                    id: section_id,
                    input_buffer: String::new(),
                    history: vec![help_text],
                    ..Default::default()
                },
                Gauge {
                    progress: 0,
                    timer: Timer::new(Duration::from_secs(1), TimerMode::Repeating),
                },
                operator_mode,
                section,
            ));
            if let Some(repo) = repository {
                builder.spawn(repo);
            }
        });
}
