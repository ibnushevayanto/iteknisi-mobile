import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';

export default function ({style, source, resizeMode = 'cover'}) {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(false);
  }, [source]);

  return (
    <Image
      style={style}
      resizeMode={resizeMode}
      defaultSource={require('../../assets/images/image_not_found.png')}
      source={
        isError ? require('../../assets/images/image_not_found.png') : source
      }
      onError={() => setIsError(true)}
    />
  );
}
