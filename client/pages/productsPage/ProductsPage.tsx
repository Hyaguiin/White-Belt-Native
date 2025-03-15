import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList } from 'react-native';
import { useCart } from '@/components/cartContext/CartContext';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/header/Header';

const produtos = [
  {
    id: '1',
    nome: 'Charuto Imperial',
    tipo: 'Charuto',
    preco: 49.99,
    imagem: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFRUVFxcYFxcYGBcVGBcXFxUXGBUdFxcYHSggGBolHRUXIjEiJSktLi8uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyArLS0tLS0tLS8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLi0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xABAEAABAgQDBQQGCQIGAwAAAAABAAIDBBEhBRIxBiJBUWETcZGhBzJCgbHwIzNSYnKSosHRFCQWNILC4fEVQ2P/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAlEQEBAAICAgEEAgMAAAAAAAAAAQIRAyESMUETMlFhIlIEQnH/2gAMAwEAAhEDEQA/APcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEWCbnYcIZosRkNo4vcGjxJQZ0XKT/AKR8MhGn9UyIdAIQdGJPTswR5qOiekVz6/0uHTcXk6IGy7D3OcSfJB3iLzmLtBjEX1YcnLDjmL5h4/LRq1omGzkX/MYnMuB9mA1ksB0qwElVueMWmFelTEyyGM0R7WDm4ho8SudnvSBhsI0M3De77MKsY15fRgrkoex8mHZnwjGd9qM98Y/qNPJTErKw4Q+jYyGPuNaweSreWLTjrLE9IJf/AJaQm4v3ntbAYf8AU818lqxNoMWi+pClJYffc+O8d2XK2q3M/FUzBV+pVvpxGulJ6J9fiMa/CCyHAA94BJW/gssJeIHCJGcSQHF8R76jjVtcptxor83RWR3bpoKWUeVT4yO1gxQ4VBWRQuzDqw1NLdgIiICIiAiIgIiICIiAi83xnaXFXzMaDKtlYUKG8s7SIHveacQAacrZfeomNhuIR6/1OKRyD7MANgDuqzUd4VblItMbXq05OwoQzRYjIbeb3NYPFxXM4j6S8Lg6zTXnlCDovmwEea4mBsTJh2d7HRX8XRXueT33APvCm5PDYMIfRwocP8LGt+CreWLTirLF9KBf/lcOm4vJ0QNgMPc7eWrE2jxmMd2HKSjT9oujRB3Zd0nvCkAq0VLy34XnFEJEw2cjD+5xWZcCdIAbLDuqwXCpB2PkWuzOhGM/i6M98Rx76nL5KdFOCpRVudq3hGOVl4cMUhw2Qxya1rfJoWYuKogVNraVFUp1TMq51IAKtOapnVzXIKju8FfRY6oVKF5VkXQ9x+CqCra2KlFTeyh+jU8uf2TduLoF0uYREQEREBERAREQEREHncxacmx99h/MyqvqFTFm0xCZ+82CfBlFbZc3J9zo4/tZKhWF/wA3Svz/ANoYgVFzPyCvDysZeeHiqXUJZRVKK25VRDUoX2VKj5/4WviEw2DDfEfXKwEmgFT0HXvXnc5tlNPfWGWw28GhoeTyqXA1PcArY42ouWnpoeFXtOQUFs8yaESMZl2ohZQPUG6S7LXQg2PUdynREHNRZpKhc7u+eqqK9fBHP7/JUL6fP8KBUA/NVXKVaHnqq5kFQSq5ijXK5pUoS2yJ3CujXNbI6FdKutyiIiAiIgIiICIiAiIg4DaNgGIO6wGHwdRYi0dfJbO14pPMdzl6eEQn91p9oOZXPy/c6OP7V1Bx/lXCixZ/mqZj81Wa7LmRzisdD1Vph9PFEsrYn3vNX9qPm6wFoWvMzsOFQOqS6uVrWuc401Ia0E0HNIGOyvbwHwg7LmAobgWIN6ai2i5KS2QiQ5iGS4GG0hxe3dILSCG0rUEmlxwroV0k5jYbn7OGX9nDER+Y9llabgHMM2al6UUfFx6M/OIUE7pg3s4tbFDXHM2tc1DwFBQq+PlIpdOjzHoqdpcNzCp0FqmmtBqVy85JTkaxLgKxh6/Zj1voiQ0iop0Oi227PvL4cSJGAfDbCazKC4AMG9UuucxLvG9VHjPynboKHiVQt6qocrgqLLA08ylDVZEQUDzxWQOBVKIAFaITGyJ1XTrltlPWd3n4rqV1uQREQEREBERAREQEREHFbbM/upY/aZFHhQ/uo6ildvRSLKO6xR4taonMsOX234vS6iKzMVasWjMKK10QLGqIleYi0pqQER4iB74bw0sqwgVaTWhzA8eVCtuiqUHMxsVkwfqu0dDDW1c3M718gqX1c4h3ME8RwWz/AOeiuIEOCCCYRLgS8APiFj62aagN5WvXRbMeRgQWPiCC1xFSQ45q1fmN3VAGY1Wq3Epp7WmHL5QaZgdQMrCQ0uo2u8aEihLeVVp0oxQoc9FvEdlDmUpXIQ90KhcMl91/A868ApPBZB0Bha5zXEmpIABJoAamgzacq96qJaIYuYu3A8kDMRUGHQAgChFXONPutPEreKi1Mi4PV3arCXBAqLM7YiytWmHLPDeE2aZlVqxh5rosgUoqT2VO+7vPxXVrk9lz9I7vPxXWLrnpy32IiKUCIiAiIgIiICIiDkvSEN2Wd/8AcD8zT/ChCp70it/t4R+zMQz3WcP3XPmqw5fhtxelyoR8/wDSp71aVi2VJRY1UlEriaKgcrCSqBQM4KtI+dVaEQXBW5kF1UKRQKtVQqmUoLmrOwLTm4jmN3GF7iaACppbW3WnitWXlZt2YxnMZl9lzmwvAEh1+6ixz5JimRMOigamiuZEroRQ8VASuCQ2PEUmJGzZhuB5pb7cRrbcLCo+E1h5gsYTErDAc6z3ty336tcAM7d7UU0pwU8fJ5XSLNJnZj6x3euuXIbPAMia2OhPFdcCvQxss6cmUsvaqIisqIiICIiAiIgIiIOZ9Io/snO+y+Gf1gfuuaLl1PpBhl2Hx6CtAw/liMJ8gVyLXVAPMLHm+G3F8sioSOSKmVc9rdY9yAqyYjtb6zgPj4K5grcUIPHXwSUKq8BVy01sqtcD6oLu4VHiLKQTKszJWIfZDfxG/g2quiS7G/WxgOgo3yuSmkbYcqtYQ71au/CK+NFji4rKs9Vjoh5kW8X3HuC1Yu0cU+oxrB1q4/sPJEpRsq8+yB+Ij/bVIsNrPrIob0FG/GpK5aZxaI6zox7gcvkFoxpgNFaE9UNOtdikuw1ZnLqEVBcLHUE1FrDwCw/4iLSTDgw2udq4iptWl+GvMrk4GIZ/VAC1Xzb2RG5iac9RVZZ44ZXdm6tMK6ScxmIbvin3WPldQU5M9qx3ZmpNQSarYjNEQdTa2tVCww+C4MeCK+qaEZhpx6qccpr+M0t4d9uk2V2jMEiDHO5oxx9joT9j4d2nquD4rox57jzXkP8Ah2LGhvisAywwS51Ru0bmp962tK+NlubMY8YeWBGNBTddX1bmgJ+z14d2mvHnfcY5443p7gCqrn8FxetGPPceanwV145Szcctll1VURFKBERAREQEREERtcwukpkAEnsn0AuTulcFJGsNh5tafEAr1RedT0SAyajQQ0jsy0ZW0AAcxrhQcrkdKdyy5Z014r3pETTphziyXbUga5S81oTcAG2nitiDgscsaY8wwdoQ2lmOFbULWg3rYjh7ltzWMw4ILWNfvXpoytKV11oBw9nvrpP2piAUgw4cIfdFTrXXTXhRefnjnlf06PK/Dak9kZaC+rmRHhw1uxhNRZxeamtQRpoVWGyC0HtIhhgFwbDJaDlBIboMxtTl3LnJrGIj/rIxNeFaA+4WK0Ys0Gi11fjwuN7R3fbqYuKyzPUhl5GhI/d1XLWj7TxfZa1n6j528lzMLEs9aAW41UXi8y9oqeJp0p8ha7luk+NdPNYrEcN+Ie4Gg8B/Cjf/ACTa5Rr86qLko+YU+fBa2IyzoDw4g5XHjYg8lHl8L+OkxiM29orQUHK6slJsvFC4/BbmAyD5n6MUqW1oaerzNSLHpU62UU6TdAjOY7RrnD/U00La/uqbuXXyneEWTgMN4OrToevEHqpSRf2oy0zA28eHf0WzGfLRJbKQ4RrVFKDLXUGlqWuTrxuomUjOgubkdQsNWu58/ffX9lMwuf8A2K/Wk9McSUfAiZHAgE2LgW040NRXge+hXQNw2BFlXxHRWtc2tGH1nUIBLauA6gUPC91pTUczBc+I4B76VoNaBoBy0tYDUqND+zdvnTSm6T3HgbmvzV4S/PcVuedbEpEMEgGhuDfRzQQaOH2TQgjqpTG50TZDuxZDDR7GgNaNqTQVFDanHRRsV4eLADjYCvib+ajf6xzX5XWpoOFOitvG9ydw+nlvupKXnYjA6F2haDXNlcQ0gihqWm7SLEarBNQQbtJtoT7628OtvBMQQ9tu8fFasrMFpyOCi529xacUnt02zG0eVwgxjQCga4+zyBP2eR4d2nqeDYrox5vwPNeFx5bMMw1U/sntLlIgRjSlAxx4cmuPLkfkXwz13FOTj29zBVVAYNi1d13uKngV1yyzcclll1VURFKBERAREQF4jtlMug4tHeODmVH2mmDDqPniAeC9uXhvpTlIkLEXxHDcjta5h4bjGscO8EA9zgos2mXSZn4AjwA+CQTTMyvHm08uXQhcfBni8Frqg91L8QVKbK4pkd2bjuPNvuvNh7jp305lNrsIyP8A6lg3SR2jRXWoAI5V0PWhvVceeFl07MM5ZuuUnC5kWp0pb/rndTUm0xRQCp07z05noFdicvBiw2Bjt4tzE2o071qXPAG50PBaWFYi+WexzHZXsJA1dWutuRp17uCr4XPHfyfVmPUaxgPgRezcCAdK2t17qKfl8LhR4EUuiBpYCaHVwaL5bilDpqTbRYMTjmOXRIpaHPIJpWxoNGipHjfXiQoyFHDTvcDagpUivPv1NxbjrNwlm99oueX4YpKEYJI1NqEH2eNDWx5/8qen5sTLWt7JoDYeUtaA0ONSc1haxaNeAPBR02Q8WHcakm3eeqi2z7s2U2DTpz6nmTz6qd43+U9w8Mt6qSgxHQnAVII0IdS3UtNtPJZokRr2m7nEmpNaVdrWpBJqTWp48Fgis7ZhANDSx5f8KMkpgtdkdYg0I6qLnb3Pa04pLqt3+rMMgGhdrzHeK8eHcFvveIouST1vRak3KiK2os4aH54LRk5otOV1iLEKtty7+V5hMel8OM6G8teb615jmFIxobYzKHXgeRWKaYIzbUDh6p/noVHSc05rspqCLEKNb7W9dM8pHcx2V2o8+o6LbnZcRB1Gh5Ks5LCK0EHeGh68u5aslMkVa7UahPfcP0pITZacj7H506LamIAiD4HkrJ2UzgFpoRcH+Vryk0Q6jrHQhPfcP0ySkctOR+o8+RWaclg8Zm6/Nit52DPjgZGOJ4GlB+Y2UrhuyUYN+miMZTg2rzTroB5qZL7iLZ6rHsntLlIgRzTgx5OnJrj8D7l6pg+K+w89x5rzCYl8LgmsR4ivHDMX35FsO35limtvGi0CCaCwLiG05UDa18QujDynqObk8b8vcQVVc1sLi75iWhviUzFtTSw1OlV0q6HMIiICIiAoDbbZxs/LOhWERu/CcfZiAWr906HoeYCn0QfNEmxwiGDEBa8OLHNOocDQg+9d1gc+I8N0GLdwFHA+202r38D1oeIWz6W9mcrhiEEaFomABelgyJ7rNPTKeBXHwZs1bFhkZ21J5EVHLgQ6/jqFlyTfTTDLTHicAykZzKZmu3ml1TaugvS1uHxC05wZmlwArTQAD4cbldpiEsyel92ztWE+w8VBa6nWx8eS4aXc5jix1nNJBB4Eahc1uUu3XjjjZpr4dNVsr8Sl67zdR59FhxGX7N3aN0Oo4ArblJgPF9VF/tFp+Kx4bN1FOKpisoXDM31h5ha09DMN+caVv381JSkwHJev5RM/FaGGzdFuYlL9oM7fWA8Ry71oYnLZHZ26HX+VvYZNVFyKKL/aJn4rFh09W17dfm6z4hKZxnb644c+hWHEZMh2eE0uzG7Wgk15gBTOE4LMvu6GWAjV+7b8J3vJNfMRv4qDkpu/vWfEJXOMzfWGnXopDEMNk4MQmPMnNoYcJtTm4bxsD0IWVmJsYPoJMkD/ANkw6gHUtJAp3LSceV7jO8uM6qLwaK95oxrnGtCGtLqeGinouysaLR1BDcOLiKkdzaqMG2U5CeYZbApSrS0OLemW4r/wtCcx6Zi+vGdTk3cH6aV99VecF2zv+RNOsGFQJf6+YFaaWZ4A1J9y137QyME1gwTEf9otp+t+95LiUWk4cYzvNlXUTe3Mw60MMhDoM7vF1v0qCnMTjRvrYr39C45fy6DwWrRVAWkxk9Mrlb7FcFllJKJFNIbHP/CCfE6BdDh2w8zEpmAYOu8fAW81ZD070ZMpLQ/wA+N/3XbKA2Swv+nhNZwa0AV1oBS6n1AIiICIiAiIgxx4LXtcx4DmuBa4G4IIoQRyovAdo8HOHTboJqYZGeC413odScpPFzXC9704ZqL6CXPbcbMMxCXMOzYrKugv+y+mh+67Q+46gKLNjyDAMT7J+8aQ30zfddo1/wCx6UPsra2wwuv9wwXbaIObRYO7xoencuZh5obnQ4jS17CWuadQ4GhBXWYBP529k41LRu1vmZpQ8y3TqKdVjzYf7R0cOfxXNwAHtLTetlFZTBiZTpWoPMfyuv8A8Mu7Ulj2thk7takivClL051W1OYDKNAMzFFubhDrbgBvea58d706MrPblC4RAbJheCTRd9HCeW/aO6Kd7qDwXTN2ikJa0vCzHm1uXxe/eKj53bqO76tjIY/O7xNvJazjyZZcsS0HZhzm0iuaOYG8f2C1oWHYbK/WRe0cCbF2cjplhj4rk5zE40X6yK93Qk5fyi3ktRXx4dM8ue307aPtxChjLLQLdaQx4NqT5KEndq5qJ7YYOTBTzNT4FQlFVaTjxjO55VklZh0N73g1c+lSbnj7R3hrwIV0Sbe41LjXnx/NrT3rDRbErJRIppDY5/4QSPedAtFGulF1GHbDTUT1g2GOu8fBtvNdbhXowZYxC5/6R4C/mg8sa2thc8lLSOzczF9WEQObt0eBv5L27C9jYMH1WNb3AA+86lTkDDYbdGhQPHMM9G0R9O0f7mD/AHO/hdfhXo5gMoSwE83b3kbeS75rANArkERK4DDYBbRSMKVa3QBZkQAiIgIiICIiAiIgIiIPKvTDsxpPwW6UbHA4iwZE93qnplPArzmDNENztNHM3mnkQPhqDzBK+mI8Fr2uY8BzXAtcDcEEUII5EL55232adh8w6HcwYgc6C433eLSftNqB1FDxQRU3tFMxNYhaOTNwD3i/mosipqbnnqfFXNCrRRMZPSbbfaiqtmTw+LF+rhvf1ANPHQLo8O2BmonrZYY/MfAW81ZDlFVramguTw4r1fCvRfDFDEzP7zlHg2/muwwzY+DBG6xre4AeJ4qB4dIbMzUX1YTgOb9weBv5LqMM9GkR14sSnRg/3O/hexwMOht0aFtNYBoEHA4X6OJdlzDDjzfv+RsPcF1MrgMNgFlLogww5ZrdAFlAVUQEREBERAREQEREBERAREQEREBERAUPtXs/Dnpd0CJY6sfqWPAOVw8aEcQSFMIg8hgeiItp2sfOeIY3KB/qcTXwC6LCvR1Lw6Hs2k83b5/Vp7l3iIIuWwOGzgt+HLtboAsqICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/Z',
  },
  {
    id: '2',
    nome: 'Cavalo Relâmpago',
    tipo: 'Cavalo',
    preco: 1999.99,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Yh1He5Qzd7Utt5rInn-gB-ZNqrDk5GwX6A&s',
  },
  {
    id: '3',
    nome: 'Whisky Sombrio 1920',
    tipo: 'Whisky',
    preco: 299.9,
    imagem: 'https://cdn.dooca.store/141579/products/m0wl6chlqzzuvqcmm4khjc33zwuwqmzulqpy.jpg?v=1722282028',
  },
];

export default function ProdutoPage() {
  const { adicionarAoCarrinho } = useCart();
  const navigation = useNavigation();

  return (
    <>
    <Header></Header>
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.produto}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <Pressable
                style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
                onPress={() => adicionarAoCarrinho(item)}
                >
                <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
              </Pressable>
            </View>
          </View>
        )}
        />

      <Pressable
        style={({ pressed }) => [styles.botaoCarrinho, pressed && styles.botaoPressionado]}
        onPress={() => navigation.navigate('pages/carrinho/Carrinho')}
        >
        <Text style={styles.botaoTexto}>Ir para o Carrinho</Text>
      </Pressable>
    </View>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 70,
    position: 'relative',
    top: 20
  },
  produto: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#222',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  preco: {
    color: '#FACC15',
    fontSize: 14,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  botaoCarrinho: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});