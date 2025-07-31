import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
    const params = useLocalSearchParams<{query?:string}>();
    const [query, setQuery]=useState(params.query);
    // const debouncedSearch = useDebouncedCallback(
    //     (text:string)=> router.push(`/search?query=${text}`),
    //     500
    // )
    const handleSearch = (text:string)=>{
            setQuery(text);
        //    debouncedSearch(text);
        if(!text) router.setParams({query:undefined})
    }

    const handleSubmit = ()=>{
        if(query?.trim()) router.setParams({query})
    }
  return (
    <View className='searchbar'>
      <TextInput
        className='flex-1 p-5'
        placeholder='Search for Pizzas, burgers...'
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        placeholderClassName='#A0A0A0'
      />
      <TouchableOpacity className='pr-5' onPress={()=> router.setParams({query})}>
        <Image source={images.search} className='size-6' resizeMode='contain' tintColor="#5D5F0D"/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar