import { ref } from 'vue';

const isDarkMode = ref(false);

export function useThemeMode() {
    function toggleTheme() {
        isDarkMode.value = !isDarkMode.value;
        document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
    }

    return { isDarkMode, toggleTheme };
}
