use crate::Event;
use abstutil::Counter;
use geom::Duration;
use map_model::{BusRouteID, BusStopID, IntersectionID, Map, RoadID, Traversable};
use std::collections::{HashMap, VecDeque};

// Embed a deeper structure with its own impl when that makes sense, or feel free to just inline
// things.
pub struct Analytics {
    pub thruput_stats: ThruputStats,
    pub(crate) test_expectations: VecDeque<Event>,
    pub latest_bus_arrival: HashMap<(BusStopID, BusRouteID), Duration>,
}

pub struct ThruputStats {
    pub count_per_road: Counter<RoadID>,
    pub count_per_intersection: Counter<IntersectionID>,
}

impl Default for Analytics {
    fn default() -> Analytics {
        Analytics {
            thruput_stats: ThruputStats {
                count_per_road: Counter::new(),
                count_per_intersection: Counter::new(),
            },
            test_expectations: VecDeque::new(),
            latest_bus_arrival: HashMap::new(),
        }
    }
}

impl Analytics {
    pub fn event(&mut self, ev: Event, time: Duration, map: &Map) {
        // Throughput
        if let Event::AgentEntersTraversable(_, to) = ev {
            match to {
                Traversable::Lane(l) => self.thruput_stats.count_per_road.inc(map.get_l(l).parent),
                Traversable::Turn(t) => self.thruput_stats.count_per_intersection.inc(t.parent),
            };
        }

        // Test expectations
        if !self.test_expectations.is_empty() && &ev == self.test_expectations.front().unwrap() {
            println!("At {}, met expectation {:?}", time, ev);
            self.test_expectations.pop_front();
        }

        // Bus arrivals
        if let Event::BusArrivedAtStop(_, route, stop) = ev {
            self.latest_bus_arrival.insert((stop, route), time);
        }
    }
}
