#[macro_export]
macro_rules! impl_from_str {
    ($enum_name:ident, $($variant:ident => $str_val:expr),*) => {
        impl std::str::FromStr for $enum_name {
            type Err = ();

            fn from_str(s: &str) -> Result<Self, Self::Err> {
                match s {
                    $(
                        $str_val => Ok($enum_name::$variant),
                    )*
                    _ => Err(()),
                }
            }
        }
    };
}
