/** @format */

import 'react-native-reanimated';

import { useEffect, useState } from 'react';

import { Stack } from 'expo-router';

export default function RootLayout() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
