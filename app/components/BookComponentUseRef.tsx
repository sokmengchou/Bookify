import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image';
import ShadowView from 'react-native-simple-shadow-view';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { fontGeorgiaBold } from '../../functions/customFont';
import modules from '../modules';
import { pushToObject } from '../services/mapping.service';
import _styles from '../_styles';
import MainButton from './MainButton';

interface Props {
    data: any
    onPress: (book: any) => void
}

export default function BookComponentUseRef(props: Props) {
    const [book, setBook] = useState(null) as any
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const { bookRef } = props.data;
        if (!bookRef) {
            if (isMounted) {
                setBook(props.data);
                setLoading(false)
            }
        } else {
            bookRef.get().then((book: any) => {
                if (isMounted) {
                    setBook(pushToObject(book));
                    setLoading(false)
                }
            });
        }
        return () => { isMounted = false }
    }, [])
    const { coverDownloadUrl, name } = book || {};
    const cover = coverDownloadUrl ? coverDownloadUrl[0] : null
    console.log(`cover?.downloadUrl`, cover?.downloadUrl)
    if (loading) {
        return (
            <Placeholder
                style={[styles.bookContainer, { height: modules.VIEW_PORT_WIDTH / 1.8, }]} Animation={Fade}>
                <PlaceholderLine
                    style={{ width: "100%", height: "100%" }}
                />
            </Placeholder>
        )
    }
    if (!book) {
        return (
            <ShadowView style={[styles.bookContainer, _styles.bookShadow]}>
                <TouchableOpacity
                    disabled
                    style={styles.book}>
                    <FastImage source={{ uri: "https://img.webnovel.com/bookcover/17390282705655105/600/600.jpg" }} style={{ width: "100%", height: "100%" }} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.bookTitle}>Deleted</Text>
            </ShadowView>
        )
    }
    return (
        <ShadowView style={[styles.bookContainer, _styles.bookShadow]}>
            <MainButton
                onPress={() => props.onPress(book)}
                component={
                    <View
                        style={styles.book}>
                        <FastImage
                            source={{ uri: cover ? cover.downloadUrl : "https://img.webnovel.com/bookcover/17390282705655105/600/600.jpg" }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                }
            />
            <Text numberOfLines={1} style={styles.bookTitle}>{name}</Text>
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    bookContainer: {
        marginTop: modules.BODY_HORIZONTAL_24,
        width: modules.VIEW_PORT_WIDTH / 2 - 24,
        marginRight: modules.BODY_HORIZONTAL_12,
        marginLeft: modules.BODY_HORIZONTAL_12,
    },
    book: {
        height: modules.VIEW_PORT_WIDTH / 1.9,
        borderRadius: 2,
        overflow: "hidden",
    },
    bookTitle: {
        marginTop: modules.BODY_HORIZONTAL_12,
        ...fontGeorgiaBold,
        flex: 1
    },
});