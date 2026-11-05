import { computed, inject, provide, type InjectionKey, type Ref } from "vue";
export type ETheme = "native" | "glass" | "sweet";
export const themeKey: InjectionKey<Readonly<Ref<ETheme>>> =
  Symbol("edesign.theme");
export function useTheme(props: { theme?: ETheme }) {
  const inherited = inject(
    themeKey,
    computed<ETheme>(() => "native"),
  );
  const resolved = computed(() => props.theme || inherited.value);
  provide(themeKey, resolved);
  return resolved;
}
