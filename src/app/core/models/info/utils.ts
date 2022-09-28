import {GUID}      from "core/utils/GUID";
import {AngleInfo} from "core/utils/Units";

import {CHANGEABLE_PORT_COMPONENTS} from "core/views/PortInfo";

import {AnyComponent, AnyPort, AnyWire} from "../types";
import {DefaultComponent}               from "../types/base/Component";
import {DefaultPort}                    from "../types/base/Port";
import {DefaultWire}                    from "../types/base/Wire";

import {ComponentInfo, PortInfo, WireInfo} from "./base";


export const GenComponentInfo = <C extends AnyComponent>(
    kind: C["kind"],
    DefaultPort: ComponentInfo<C>["PortInfo"]["Default"],
    InitialPortConfig: string,
    ChangeGroup?: number,
) => ({
    Default:  (id: GUID) => ({ kind, ...DefaultComponent(id) }),
    PortInfo: {
        Default:       DefaultPort,
        InitialConfig: InitialPortConfig,
        AllowChanges:  (CHANGEABLE_PORT_COMPONENTS.includes(kind)),
        ChangeGroup,
    },
    PropInfo: {
        "x": { type: "float", label: "X Position", step: 1 },
        "y": { type: "float", label: "Y Position", step: 1 },
        ...AngleInfo("angle", "Angle", 0, "deg", 45),
    } as ComponentInfo<C>["PropInfo"],
});

export const GenWireInfo = <W extends AnyWire>(
    kind: W["kind"],
) => ({
    Default:  (id: GUID, p1: GUID, p2: GUID) => ({ kind, ...DefaultWire(id, p1 ,p2) }),
    PropInfo: {
        "color": {
            type:    "color",
            label:   "Color",
            initial: "#ffffff",
        },
    } as WireInfo<W>["PropInfo"],
});

export const GenPortInfo = <P extends AnyPort>(
    kind: P["kind"],
) => ({
    Default: (id: GUID, parent: GUID, group: number, index: number) =>
        ({ kind, ...DefaultPort(id, parent, group, index) }),
    PropInfo: {} as PortInfo<P>["PropInfo"],
});