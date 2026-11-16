import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  const [valor, setValor] = useState('');
  const [sentido, setSentido] = useState('CtoF');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const converter = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado('');

    const temp = parseFloat(valor.replace(',', '.'));

    if (isNaN(temp)) {
      setErro('Por favor, informe uma temperatura válida.');
      return;
    }

    if (sentido === 'CtoF') {
      const fahrenheit = (temp * 9) / 5 + 32;
      setResultado(`${temp} °C → ${fahrenheit.toFixed(1)} °F`);
    } else {
      const celsius = ((temp - 32) * 5) / 9;
      setResultado(`${temp} °F → ${celsius.toFixed(1)} °C`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Conversor de Temperatura</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite a temperatura"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Modo de conversão:</Text>
        <View style={styles.botoesModo}>
          <Button
            title="Celsius → Fahrenheit"
            color={sentido === 'CtoF' ? '#2196F3' : '#888'}
            onPress={() => {
              Keyboard.dismiss();
              setSentido('CtoF');
            }}
          />
          <View style={{ height: 10 }} />
          <Button
            title="Fahrenheit → Celsius"
            color={sentido === 'FtoC' ? '#2196F3' : '#888'}
            onPress={() => {
              Keyboard.dismiss();
              setSentido('FtoC');
            }}
          />
        </View>

        <Button title="Calcular" onPress={converter} color="green" />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {resultado ? <Text style={styles.resultado}>{resultado}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  botoesModo: { marginBottom: 15 },
  resultado: { marginTop: 15, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  erro: { marginTop: 15, fontSize: 14, color: 'red', textAlign: 'center' },
});