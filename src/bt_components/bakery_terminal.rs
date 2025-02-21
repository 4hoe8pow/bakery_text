use std::ops::{Add, Sub};

use bevy::prelude::*;

use super::bread::Bread;

#[derive(Debug, Component)]
pub struct ModalComponet;

/// BakeryTerminal component
#[derive(Component, Default)]
pub struct BakeryTerminal {
    pub id: u8,
    pub input_buffer: String,
    pub history: Vec<String>,
    pub status: HealthStatus,
}

impl BakeryTerminal {
    pub fn add_input(&mut self, input: &str) {
        self.input_buffer.push_str(input);
    }

    pub fn remove_last_input(&mut self) {
        self.input_buffer.pop();
    }

    pub fn submit_input(&mut self) -> String {
        let input_text = self.input_buffer.clone();
        self.history.push(input_text.clone());
        self.input_buffer.clear();
        input_text
    }
}

#[derive(Debug, Default)]
pub enum HealthStatus {
    #[default]
    Normal,
    Abnormal,
}

#[derive(Debug, Component)]
pub struct Gauge {
    pub progress: usize, // 残り時間
    pub timer: Timer,
}

impl Gauge {
    pub fn start_timer(&mut self, duration: f32) {
        self.progress = duration as usize;
    }
}

#[derive(Debug, Default, Component)]
pub enum OperatorMode {
    #[default]
    Observer,
    Commander,
}

#[derive(Debug, Default, Component, Clone)]
pub struct Repository {
    pub flour: Option<f32>,
    pub salt: Option<f32>,
    pub sugar: Option<f32>,
    pub butter: Option<f32>,
    pub yeast: Option<f32>,
    pub dough: Option<f32>,
    pub bread: Option<Vec<Bread>>,
}

impl Repository {
    pub fn new_raw_only() -> Self {
        Self {
            flour: Some(0.0),
            salt: Some(0.0),
            sugar: Some(0.0),
            butter: Some(0.0),
            yeast: Some(0.0),
            dough: None,
            bread: None,
        }
    }

    pub fn new_raw_with_dough() -> Self {
        Self {
            flour: Some(0.0),
            salt: Some(0.0),
            sugar: Some(0.0),
            butter: Some(0.0),
            yeast: Some(0.0),
            dough: Some(0.0),
            bread: None,
        }
    }

    pub fn new_all() -> Self {
        Self {
            flour: Some(0.0),
            salt: Some(0.0),
            sugar: Some(0.0),
            butter: Some(0.0),
            yeast: Some(0.0),
            dough: Some(0.0),
            bread: Some(vec![]),
        }
    }

    pub fn new_dough_with_bread() -> Self {
        Self {
            flour: None,
            salt: None,
            sugar: None,
            butter: None,
            yeast: None,
            dough: Some(0.0),
            bread: Some(vec![]),
        }
    }

    pub fn new_bread_only() -> Self {
        Self {
            flour: None,
            salt: None,
            sugar: None,
            butter: None,
            yeast: None,
            dough: None,
            bread: Some(vec![]),
        }
    }
}

impl Add for Repository {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            flour: self.flour.zip(other.flour).map(|(a, b)| a + b),
            salt: self.salt.zip(other.salt).map(|(a, b)| a + b),
            sugar: self.sugar.zip(other.sugar).map(|(a, b)| a + b),
            butter: self.butter.zip(other.butter).map(|(a, b)| a + b),
            yeast: self.yeast.zip(other.yeast).map(|(a, b)| a + b),
            dough: self.dough.zip(other.dough).map(|(a, b)| a + b),
            bread: self.bread.zip(other.bread).map(|(a, b)| [a, b].concat()),
        }
    }
}

impl Sub for Repository {
    type Output = Self;

    fn sub(self, other: Self) -> Self {
        Self {
            flour: self.flour.zip(other.flour).map(|(a, b)| a - b),
            salt: self.salt.zip(other.salt).map(|(a, b)| a - b),
            sugar: self.sugar.zip(other.sugar).map(|(a, b)| a - b),
            butter: self.butter.zip(other.butter).map(|(a, b)| a - b),
            yeast: self.yeast.zip(other.yeast).map(|(a, b)| a - b),
            dough: self.dough.zip(other.dough).map(|(a, b)| a - b),
            bread: self.bread.zip(other.bread).map(|(a, b)| {
                let mut result = a.clone();
                for item in b {
                    if let Some(pos) = result.iter().position(|x| *x == item) {
                        result.remove(pos);
                    }
                }
                result
            }),
        }
    }
}

impl std::ops::AddAssign for Repository {
    fn add_assign(&mut self, other: Self) {
        if let Some(flour) = other.flour {
            self.flour = Some(self.flour.unwrap_or(0.0) + flour);
        }
        if let Some(salt) = other.salt {
            self.salt = Some(self.salt.unwrap_or(0.0) + salt);
        }
        if let Some(sugar) = other.sugar {
            self.sugar = Some(self.sugar.unwrap_or(0.0) + sugar);
        }
        if let Some(butter) = other.butter {
            self.butter = Some(self.butter.unwrap_or(0.0) + butter);
        }
        if let Some(yeast) = other.yeast {
            self.yeast = Some(self.yeast.unwrap_or(0.0) + yeast);
        }
        if let Some(dough) = other.dough {
            self.dough = Some(self.dough.unwrap_or(0.0) + dough);
        }
        if let Some(bread) = other.bread {
            self.bread = Some([self.bread.take().unwrap_or_default(), bread].concat());
        }
    }
}
