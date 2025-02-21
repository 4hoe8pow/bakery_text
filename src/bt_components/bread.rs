use std::cmp::PartialEq;

use bevy::prelude::*;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub enum BreadName {
    Baguette,
    Ciabatta,
    Pretzel,
    Koppe,
}

#[derive(Debug, Clone)]
enum BreadStatus {
    Unfermented,
    FirstFermentationComplete,
    SecondFermentationComplete,
    BakingComplete,
    CoolingComplete,
    PackagingComplete,
    SoldOut,
    Spoiled,
}

#[derive(Debug, Component, Clone)]
pub struct Bread {
    pub id: Uuid,
    pub name: BreadName,
    pub selling_price: f32,
    pub expiration: u8, // seconds
    pub is_genuine: bool,
    pub status: BreadStatus,
}

impl PartialEq for Bread {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Eq for Bread {}

impl Bread {
    pub fn new(name: BreadName) -> Self {
        let (selling_price, expiration) = match name {
            BreadName::Baguette => (1.0, 254),
            BreadName::Ciabatta => (1.6, 157),
            BreadName::Pretzel => (2.6, 97),
            BreadName::Koppe => (4.2, 60),
        };

        Bread {
            id: Uuid::new_v4(),
            name,
            selling_price,
            expiration,
            is_genuine: true,
            status: BreadStatus::Unfermented,
        }
    }

    pub fn update_status_unfermented(&mut self) {
        self.status = BreadStatus::Unfermented;
    }

    pub fn update_status_first_fermentation_complete(&mut self) {
        self.status = BreadStatus::FirstFermentationComplete;
    }

    pub fn update_status_second_fermentation_complete(&mut self) {
        self.status = BreadStatus::SecondFermentationComplete;
    }

    pub fn update_status_baking_complete(&mut self) {
        self.status = BreadStatus::BakingComplete;
    }

    pub fn update_status_cooling_complete(&mut self) {
        self.status = BreadStatus::CoolingComplete;
    }

    pub fn update_status_packaging_complete(&mut self) {
        self.status = BreadStatus::PackagingComplete;
    }

    pub fn update_status_sold_out(&mut self) {
        self.status = BreadStatus::SoldOut;
    }

    pub fn progress_spoilage(&mut self) {
        self.expiration = self.expiration.saturating_sub(1);
        if self.expiration == 0 {
            self.status = BreadStatus::Spoiled;
        }
    }
}
