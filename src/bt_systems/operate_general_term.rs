use crate::impl_from_str;

#[derive(Debug)]
pub enum GeneralCommand {
    Ls,
    Mv,
    Shoo,
    Help,
}

impl_from_str!(GeneralCommand, Ls => "ls", Mv => "mv", Shoo => "shoo", Help => "help");
