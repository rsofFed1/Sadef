export default function getOptionLabel(
    value: number | string | undefined,
    options: Array<{ label: string; value: number | string }>
  ) {
    const found = options.find((opt) => String(opt.value) === String(value));
    return found ? found.label.replace(/([A-Z])/g, " $1").trim() : value;
  }