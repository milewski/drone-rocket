export interface FieldInterfaceWithWhenCondition extends FieldInterface {
    when?: Record<string, string | string[]>
}

export interface FieldInterface {
    title: string,
    value: string,
}

