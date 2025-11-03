import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LoginSignupScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Email and password required!');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email address!');
      return;
    }
    setSuccess(true); // Simulate login success
    resetFields();
  };

  const handleSignup = () => {
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields required!');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email address!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setSuccess(true); // Simulate signup success
    resetFields();
  };

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{isLogin ? 'Log in' : 'Sign Up'}</Text>
      <Text style={styles.subTitle}>Welcome {isLogin ? 'Back' : ''}</Text>
      <Text style={styles.desc}>
        Please enter your detail to {isLogin ? 'Sign in' : 'Sign up'}
      </Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.row}>
        {isLogin && (
          <TouchableOpacity
            style={styles.checkBoxRow}
            onPress={() => setRemember(!remember)}
          >
            <View style={[styles.checkBox, remember && styles.checkBoxChecked]}>
              {remember && <View style={styles.innerDot} />}
            </View>
            <Text style={styles.checkText}>Remember me</Text>
          </TouchableOpacity>
        )}
        {isLogin && (
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot password</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleSignup}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#c9ddf4ff' }]}
        >
          <Image
            source={require('../assets/facebook.png')}
            style={styles.socialLogoImage}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#c9ddf4ff', marginLeft: 10 }]}
        >
          <Image
            source={require('../assets/google.png')}
            style={styles.socialLogoImage}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 22, marginBottom:50, alignItems: 'center', flexDirection: 'row',}} >
        <Text style={styles.footerText}>
          {isLogin ? "Don't have account?" : 'Already have account?'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsLogin(!isLogin);
            resetFields();
            setError('');
            setSuccess(false);
          }}
        >
          <Text style={styles.footerSwitch}>{isLogin ? ' Sign Up' : ' Sign In'}</Text>
        </TouchableOpacity>
      </View> 
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.successText}>Success!</Text>
            <Text style={styles.popupDesc}>
              {isLogin ? 'Logged in successfully.' : 'Account created successfully.'}
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setSuccess(false)}
            >
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 container: {
  flexGrow: 1,               
  backgroundColor: '#eff5ff',
  alignItems: 'center',
  justifyContent: 'flex-start',  
  paddingTop: Platform.OS === 'android' ? 50 : 70,
  paddingHorizontal: 26,
  paddingBottom: 30,
  maxWidth: 500,
  maxHeight:"500px",
  width: '100%',
  alignSelf: 'center',
},

  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#326bfbff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#393e46',
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    color: '#555',
    marginBottom: 36,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: '#c7d5fbff',
    borderRadius: 10,
    borderColor: '#b7b7b7',
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
  },
  error: {
    color: '#e63946',
    marginBottom: 7,
    fontWeight: '600',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
    backgroundColor: '#fff',
  },
  checkBoxChecked: {
    borderColor: '#2052df',
    backgroundColor: '#e7eefc',
  },
  innerDot: {
    width: 11,
    height: 11,
    backgroundColor: '#2052df',
    borderRadius: 6,
  },
  checkText: {
    fontSize: 15,
    color: '#393e46',
  },
  linkText: {
    color: '#2052df',
    fontWeight: '600',
    fontSize: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#2052df',
    borderRadius: 10,
    paddingVertical: 16,
    marginVertical: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  orText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '600',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 14,
    justifyContent: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    flex: 1,
    justifyContent: 'center',
  },
  socialLogoImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#2d3648',
    fontWeight: '700',
    fontSize: 15,
  },
  footerText: {
    fontSize: 15,
    color: '#393e46',
  },
  footerSwitch: {
    fontWeight: '700',
    color: '#2052df',
    fontSize: 17,
    marginTop: 5,
    marginBottom:10
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  successText: {
    fontSize: 23,
    fontWeight: '800',
    color: '#219653',
    marginBottom: 8,
  },
  popupDesc: {
    fontSize: 16,
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  popupButton: {
    backgroundColor: '#219653',
    borderRadius: 8,
    paddingHorizontal: 34,
    paddingVertical: 11,
  },
  popupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default LoginSignupScreen;
