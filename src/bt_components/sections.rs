use bevy::prelude::*;

#[derive(Debug, Component)]
pub struct Purchasing;

#[derive(Debug, Component)]
pub struct Pantry;

#[derive(Debug, Component)]
pub struct Mixing;

#[derive(Debug, Component)]
pub struct Cooling;

#[derive(Debug, Component)]
pub struct Shaping;

#[derive(Debug, Component)]
pub struct Baking;

#[derive(Debug, Component)]
pub struct Packaging;

#[derive(Debug, Component)]
pub struct QualityControl;

#[derive(Debug, Component)]
pub struct Stockroom;

#[derive(Debug, Component)]
pub struct SalesFront;

#[derive(Debug, Component)]
pub struct WasteStation;

#[derive(Debug, Component)]
pub struct Utility;

pub trait Section {}

impl Section for Purchasing {}
impl Section for Pantry {}
impl Section for Mixing {}
impl Section for Cooling {}
impl Section for Shaping {}
impl Section for Baking {}
impl Section for Packaging {}
impl Section for QualityControl {}
impl Section for Stockroom {}
impl Section for SalesFront {}
impl Section for WasteStation {}
impl Section for Utility {}
