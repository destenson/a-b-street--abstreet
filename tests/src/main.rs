extern crate dimensioned;
extern crate gag;
extern crate geom;
extern crate sim;

mod physics;
mod runner;

fn main() {
    let mut t = runner::TestRunner::new();

    physics::run(&mut t);

    t.done();
}
