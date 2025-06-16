export const selectSearch = (option: { label: string; value: number | string } | undefined, input: string) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};
