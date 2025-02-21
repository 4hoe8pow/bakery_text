use std::fmt;

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

impl fmt::Display for Purchasing {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Purchasing")
    }
}

impl fmt::Display for Pantry {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Pantry")
    }
}

impl fmt::Display for Mixing {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Mixing")
    }
}

impl fmt::Display for Cooling {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Cooling")
    }
}

impl fmt::Display for Shaping {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Shaping")
    }
}

impl fmt::Display for Baking {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Baking")
    }
}

impl fmt::Display for Packaging {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Packaging")
    }
}

impl fmt::Display for QualityControl {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "QualityControl")
    }
}

impl fmt::Display for Stockroom {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Stockroom")
    }
}

impl fmt::Display for SalesFront {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "SalesFront")
    }
}

impl fmt::Display for WasteStation {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "WasteStation")
    }
}

impl fmt::Display for Utility {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Utility")
    }
}
