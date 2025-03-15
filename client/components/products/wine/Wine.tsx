import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useCart } from '@/components/cartContext/CartContext';

const produto = {
  id: '1',
  nome: 'Vinho Caro',
  tipo: 'Cavalo',
  preco: 956.99,
  imagem: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUSEBAVFRUVFRUXFhUXFhUVFRYWFhUYFhUVFRUYHiggGBolHRUVITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUtLS0tLS0tLS8tLS0tLS0tLS0tLS0rLystLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIEBQYHAwj/xABDEAABAwIDBAcEBggGAwEAAAABAAIRAwQSITEFBkFREyIyYXGBkQehscEUNEKC0fAjUmJyc6Ky4SRTs8LS8TNDkoP/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACQRAQEAAgIDAAEEAwAAAAAAAAABAhEhMQMSQTIEE1FxIpHB/9oADAMBAAIRAxEAPwDrSEIXRoISTQEIQhAJJpIoQhCASQkgEISVAhCEAkhCAQhJAJFNJBEoQU0HuhCSiGhCEDQhCASKx28d70NrXqh2EspuLTrDiIZ/MQuEs27dvJL7muf/ANH/ACKlunXDx3N9B9OyYxtnlIn0XovnWptGsda9c/ffHot+9ke26tR9ajWqvf1Q9mMlxEGHZnxakylXPw3GbdLSKaRVciQkhUCEkIGkhCAQhCASKaSCJQgoVHuUk0lkMJhIFNENCEIMHvxQNSwuWt16Mu8mEPPuaVwK1qEaAlfQm9Riyuf4FX+gr59sljN6/wBP1UjVPI+i3P2O0ibuo7g2i6fvOaB8D6LTyt19jT/8TXHOjPo9v4qY9t+b8a62VEplRK6vESEJIGhRlNA0JICBoQhAJJpIEUJFNUeqSaSiGEwohSCipBNIJojE72fUrn+BU/pK+fdn6lfQO931G5/gVP6Svn2xMErGT1fp+q9iFuPscP8AjKv8B3+pTWngarb/AGO/XKv8B3+pTTHt08v4114qJUyoEro8RFRTJUUDQkmqGmkmoGhCEAkmkgRQgoVHoUkIUDCkFFMKCQTSCaIw++Rixuf4L/eIXz/ZDMr6C3tI+h3E/wCU735Liu4tvSq13sqgOAYTEkQZGeS5eTLVkdvF5Jh2x7eK2r2SPi+eP1qLx/M0/JY7dq0oV3XIeJwRhhxEZuHA56DVXvZER9OdOZwPA/Pks4Zy6bz82OU1HZSoFTK83L0POUqKZSVBKYSTQMJpKQQCEJqAQhJAihCFRNCElA1IKCkEEgpKAUpURgd/aobs+4J/Uj1cFxD2XUSatw8cGAf/AESf9q3f2ub0NfSNrRcImXu4GOAXHtmbXr2xd0LsOLtZTMafEp1Rt3s8BNxdtORwuJ8Q92XvVz2N1Y2gc9cY9Q5aDbbVr03uqU6hY584i2BMmT71ldz9pvoXDaoOeIHzmfxSX4SvqIqBKx2w9t0rqmHsOcdZvEH5hXyVVIoQkqGmooQTTCiFIIGmkEwoBJNJAimgoVDQkUKBphRBTQTC597Rt7+haaNJ0H7ZH9IW6bXvOhovqcWtMeJyC+Z97NpOqVnZ6H3p1yKG1NouqOJJlY4q3sywfXqCmzUgnSYA4lZq63MrsEhwPcQR+Kxq3llrK9KVXCmaRxYeMx3TMLJO3fuIno/ekl+I2Tc7eV9J4LXQR7wu67H2k24pCo3zHIr5Xt6rqb+RBgjwyK7R7MNqnFgJyePfqPz3rcu2pXTC5QL+74Khb1S+vV6/VY1jA0HR+bnk8z1mDuw969wXT2gfumfWfkqq1PePf+CWI93v/BS+i1OGH1P4LwcXAxDcv2j+CD3BPd6n8E8Z5T4EfOEqNF7hIDf/AKP/ABTqMc3WPioJNqDTjyOX/amvCnmc8+K9wUDSQhAimkUKgKEklBJSCgmEGA38qRaO73D4FfNO0zNRx/aPxX0nv/8AVD+8PgV87X9iS4kOGpKmXSzG5dM77L6rBc1A5o61PI8oe34z7l0LeS4p06L3wMmOPmGkhcx3WtH0qweYw4SMjnqD8ltG9Fd9SiW0xJIiMhqROvctY3hqePPXVc1a7OSu2WgpvoB4AEty5wRkuNO2ZW/y/e38V0a0usNINnQAe5PHWZ48v4rnW02RVqSftv4a9YrffZtXwvpEnIET4ArS7+xqdI85dZziM+biVtO6LC0Bv3cv2jB+Kzj2nrlO46xusD0bnu7VVz6ru41Xl0eQgeSztuJcPELFbJENI5YR6DgstZdoLdWsydFhqp6x8T8Vl3nJYUnNZiRldnnq+ZUL8J7NPV8/wU74ZJ9FGmc1YKqyrJVDQkhAimkUIEhIoUDTUZTCDX9/vqjv3h8CuCXPaPiu97+fVHfvN+BXBLvtHxUy6ejwdsjso5rZNn2YrPDHEgawBLnAEYmtzGeHEfurG7F2dbuDT9LaCRJaQAQSAYBJAMExw0PiMvU2WYBZWZrria3CcJc0yHGMwGzPa9TN8PdKlvhsm2a0VKBa3CBiAza6ThaBH2pDjPHC458MBTf1VZu7GtWDHOuhUHVyLy5zQ7CA4tJyhrpPLCRwTZsoAQ66oj7wLuOWGdYgxP2gkumN6mmuXhzWybi0S6qOTcz8Frm2KTWPwsqioIBxDSeWpW1+z9+EVHxkG/ke8K49uHk5dL2X2Sebj8h8llbN0OmJWF2G49CwnUiT4krO7N1K1XlrJVDksOFkqlUFsjvWMapEZLZxy817XehVfZ5yKsV9Cn1GOcrDDkFXJXtROSo9EJIQIoQUIEkmkoGgJJhBgd+vqjv3m/NcDve0fFd934+qP8W/NcDve0fFTLp6PB2vbIu3syY8idRw8wsxcXz8OZB8WsPxCweyqZc4Na0uLiAABJJOQAC3p+4d8WAmm3hLcbcYHHLSfNZezeu2iXV8+T2c9f0dP/ivB206kRIH3Wfgt23k9m1dtUNswajMEufUcxgDpIwiMzkAdOK0XbmyLi1fguKRYTmNC1wHFrhkVNuVz30pPqStz3JrDo64JADWgxMTP/S0QFZ2zZFB7mu6x5ZEYRl8StY3l58snRKe17nCBSLGtjKAT7z5rPbrXdy5z+kqyOrHdrPDwXELfee7pGBUDgODmg+/VbVuv7QXNeW1qbBMQQXNn1lamUrP7nGv+Otbbr1RTdhqR1TmtGFzfDS7PontzfhnRuBpO04EHKcytRbv1R/y6n8v4rW5Fx8uWPDqm61zdw7pK+PMRks5dX9YNMFpyOvguZbub9W8HqVNeTfxWR2lv3SAMU3HI8QFeGbnbd8MsN67hvbtmvHNrsJ9DPxWe2BtxtwJDHsMwWuju0IOeq4leb/VP/XQaO9zi73CPitr9l+17i4rA1XZYiQ1owtyHLj5rO5ekyylddQhCMEUIKSAQmUlFCYSTQYPfYf4R/i1cDv+0fFd930+qVPu/FcFunAPlwkBwJHMA5hTLp38HbpXs03NuKVSnd1w1rcJLWEnpAXNhriIgZE5TOaLraO0W7Qwh1XF00CnLujNPFl1dMGHj56rz36o3r7ulWtulfSdTYaLqWIta7Mns6EyDJ1Eclve8W1K1tZOrYQ6q1jJGrQ5xa1ziBwBJK57drldy97aN7X9qXdF1JtKo+nScCS9hLcT57JeMxAggTnJ5Knd7Nur/ZVIVRNcOxMdU6pLQ4gFxjUsPnkVldxd6rm7q1KNwGvDWYw8NDY6wGFwGRmcsvsnVax7ULm+F21lM1m08LeiFPGA5x7R6urpyjgI5qVnWv8AFoN/Y1aFQ06zMLm6ju4EEajvWa2UAaThxM+mX91b9oRdithUjphQHSxzMf7g9V9iMJYSBMfDjH55rWPMcc5q6alcth0csvTJelOvlBzHf8lY2jQl7jHE/wBiqgYs7cdWDG4CA4gcpMei8CrBbK8XMIVZ0t2V86mOqFO42jUeM4HgqbQh6uwiV2L2LWn2+TXH10+K4/b0S9waNSYX0b7N9l9DbBxEF0R+6Pz7lrD+VjbkFJC2pFCChAFCZSKyoQlKEGH3y+qVPu/Fc7p3exramz6RavrVnMa5+WIDFmIxuDfRdE3v+qVPL4hcn3m2Y+pRtK1Fj34qTqTgxpcQ+lUdwAnMO/lUz6dvD26LuvvNa1res2wpPaaFMubReOYcWtbDjlLdBzWL3L3nubmuaFwRVp1GPJBY0BoAngM2nSDOoWjbrVr2yuGOZQqB7jg6N7HtFQOI6mYHEAzwhde3guTaWlS5pW9NlYhmLCAQHOcAS5wALwJK5u+WMx412w2+Vw3ZlrisqFOm6pUa0uDAA2Q44nAanqwJyz8lid0d5atehXqXZGGhBNUNiW4S5wIbkSAJyH2gvfcneCtfurW94xlVgYHSWNjtAYHgZGdRl9k+Wp71b1sfRNraUG0KEnFGEF8HQBuQBIniSmvias4vbw2rdbGr1HVHvql7jm89KPCBEAeSvbvWNBlxTbSf0tJ4aZMEEFxaWnnoQueVBn+c10vYlr0NxQpcWUqQd3OJLne93vWvHNVyz6a/v5u66zq5NcaLpLHkl2RObXE/aEgZ6yDzjT6gzX0rtrZdG6ouo124mO8iCNHNPAhcH3w3WrbOqAP69F5PR1R/Q4fZcPfw4xMsdcxxta9CjCsdH5jgVEQNVlNPGE8HdkrdGkXAQFs+6m59a7qQwYWjtvOjR8z3Ish+zfdl1zczh6jBLncBMQPEr6Ao0g0BrRAAAA7gqOw9j0bSkKVFsAani48XFZFdpNRKEFCFUJJMpKiRSTKisqEIQUGH3t+qVfAf1BaHuLtesBc2tFzRVINW3x5tLwAHsIniA0+pW+b1fVavgP6guF1rp9KsKtJxa9jg5rhwI+I4RxBUy6dvFN11bdDei6dbXNzfhobQdhDQwseaje00yYmSxviStd2XvxXp1Krq7RWp1jL6ZMAZR1JBEYYEEZgDxWYttq0ds2v0dtVtvcYmvfTIyqOaPs8XNORyzECZ44a33DvOnp0q1P8ARlwx1GODmhozdnqDAgSBmQuc09GMx522fY9yyvQqOtrdtjbEOx1uoxzoEONMAQIEjG45cAeGsV95tnWgwbPs21CMulflPg5wL3D0Cu+0Gne16jbO0tav0eiGjqsLab3ACOsYBa0QBnEzyCxuztwHtb0u0KraFJubhiaX+Bd2W+8pwmprdWdi7yVboValzQpNt6TS5z8yMQzDQHSCYz9OYWH3ZvjWuuldkX1JjkCeqPIQPJUt8N4adRrbWzZ0dtT7iDUIzDiDnE555k5lPcr/AMrP3h8VrCarl5OnapVXaez6NxSdRrsD2OGYPuIPAjgQvU1AgPXS2OGnFN591WWlU0m1sIILqfSjCHt4htUDCSOIdhIkaiCdcds5/wCtSjn09CPXHC7/ALc3et70U2XLSWsqBwwktdoWkYhmAZz8AsXtzcnZVKjUf9EAwU3uBD6mKWtJGeLMzGq5+u+m/b5Y0Xc3dEXDwDVBAEv6PrBo76nZnlE/Mdm2Vs6lb0xSotwtHqTxLjxKxO5exhaWtNmRe4B9Q83OEx4AQPJbA1XCaTK7SCYXlRmJPEz4DgPReoW2KElJJERKEFCCRUSUyF5PfBWbWtHj8lFzspnivBz54wOfEqQe2IEdyzaumP3md/hav7o+IXEG1KIqu6dpczMZTIOUHIg8/Vdo3mqxa1c8sPzC4FtnPGRzB/PqreYuOXpds9b2tpDSyuQ4GmHa5SQHvbLQSQZPh4Z7dS25e0aZNG/6bA2cLhTfihwa7AS4vga5xlETqOQWznjR5HmrbrurHb48gfksO8/UY2cxvtz7RNpOyFVje9tNk/zSqQe68GO6vTiBMCoQWwMMlvWAb2tAM/WNPNy/9b3BH0t8dr3BF/fw+Rm9pWVs1riy4xPEQ2MtcxiaCHGOMgLIbmviqzxHx/utQLydSVsm5tSKlOToR8lqXTjl5Pbh2kPXu1/MKg53fPenSrK72aZRrxrKo74uPRBonr1KDMtYfXph3uJVii+Wzy1VbeUy62H61ej/ACnH/tV2zrlmwpP0Xj0iZrRHfkpvcTT3BUgvIPUg8LUvCWJpKOPOEy8IgKEg8IVEHVCdV4PUX1ADJjTPUwoHCRIOXPw1Xm/cdfUvHPklVqAjRefQ5hweRGo1BULk4Q50xGXOZ0hY95pr15YneR5+jVZ1w/MaLht67NwIyn/pdvuwLmk+lTc0Pe2GEmGuPBp5E6AriN81zXPa4FpaSHA6ggwQe8ELWOUvTPkmnna24c2s4/8ArpBzfHp6NM+PVqOXmBOnp4Zz6K1sqg57a4acxQc7DxcGvY98DjDGvd91VGVXNIc0weY/Oi25PNJxWW2HauvK7LcUQ9zzAdTw0SwfaccLcGECSZbPfoq+3rBtCs6nTqirT1p1QID2yWkgSdHNe37s8UNKIctg3bA6WmCPtD4rXqazGxXxUYf2m/FS9Lj27jY0qY0DnDjGUHzyVw2HWESO/wCyeeUyD6rX6L8TzgktgEAcf7lZYVHUaePo6jzV+y1rjhZ5aErn7PTYuOfq3Ro94zzyVLbrpqWmf/uH+jUPyKrm4LTo/LqkuEROjwDwzAU9ojFUt84DHYnHgB0T2D+oK+2kuLKvuI1Og935+CsS0w4ZZacM+R/FUa4o9UudnBz5zlK9qBa0RwA48uMpjlYzZFqo8xlqPh3pscAM+I/MrzqDCcI4e/JRa4E8/h71blymuFh9URIKjEgGdfhwKhhGYkzz0AHOe5eNS4xOgExHmBwW5mz6rQaOaFXMxpPln7kLfvE9XhWucMRTLmnIOBzEgkyDppGfNWLO0w6Hqk/ayI8AOOissYye0ZPLT0U30m83HuBDR66ryTH67XL4o1aYnVxzGgwgepzVfaVMPYcYwsDsUznABk5fBXblkkQACQSBOq8bp8SCWw0ddro0Ik+IzSzSytU2vVo0qHTUqIqsgyDVqMcxzRjAMHIwJHgsDtG4tbyj9MbsttySYum061Rlek8ZYsLR12EDIwO/jG80LW1bikYW1o6rjipktdlA4GUranUouw0WW5/zCzo6R0OlMNJ7QAguGpzMZ3HUTPly/d+62G24pV2Vbm1cx2dOs0VqLgQWvZiZLgC1zhJ0nReG8Hs7u6VSoLZrK9NrjDadRpqsaesxtRjoM4S3SZ1W8bX3btXUOmqbJp9KWs6SkxtTFTc6S8h9A/puAwsAz1cBJF64p0nXVGo+m5jnW1OqwGqaQqPYHNdSqUwSTgawEziyy4Qeu3H1aMNkXdhYkUbas66u2/pajKb3fR6H+UHNGVR3Hl5Bapt606DobZ5ipTpl1QaYH1Tj6Mc8LcM8MRcOC6zs3Ytbpn3Lbu/Y7E/DTruxW9Sq8P6MzQP/AImkSQWjLCMpVC7Zt7oiX0ra7wFgaXNpVKNwx0jpGEFuBzSBIJAhwIAgy2acxpbCuzGC0ruBALSKNSCDo4GIgrMbLb9FrCnUtWueHhpfWZULZnMUmZNMH7RmeELou2bZzbpjqW0HW7q1GoRRANZjjhJ6RrOyHte4yM5AERwlu/8AT3va8XNrdUMy59EYKkgT12g4ZMRxMnuUt2sx1WS2btRzqbTjDYMFrWsaAW6t00KrXVvfuqNf05ayJeekLWNIMGGToRB+aythWDmj6RSFKp9o9UMJPEEHLz96t1rIuaew8TLesM9RxB7lz1t29tfFS1dcsa59R2RHVBfjb3Enwj3rwu7Z9QNhuKHAwMgSab29Z3LrT6LKW9B+DDUY14h3VBaQGx1WwdZI8lWuqj+pjaWwcmiMuzEfrRB8Z4K6JeXjetLQwdGIAOZJ11A79B+ZT1fDXM6ogh0g9oYhlORGLPgQFft3jFljcHxkR1R3gHReopUmOLgxuM/PUj8ApInsVxbukukRgAHHxOWuQC8qBwyDwgTxjmrAfULsx1cs515iFFwg9mZ1jTz9Vb2iVR0M7jz45/DVY5tJ7yS1uHniERzB/ESrt4IZ9kECGhx6o4AnOTEe9eAe4CXPBnQNIgQM4hW9mPR3VRrWhvStDshjPdwAJQvKo1ju03GOTmtdBQs27amoyFJhkOa85cIyJ5oLp4jj35qmxhote51SXuyBJBwgnIAEgfBU6NCoCX02uDXkkh7nF2LuBJGEcA08Ssynqv3AdEsdie0DCxpaHEToC7JvHNJ+KR0tMAnTqg5xJzIOWv5Kp16LyG5GocR62hY2J18QFkbOo/jUmYhpglviQc/RWclmo832zf0beqcA6kgDrnMuwjIxkQOBVanZuYWtY0AEkuc4YnYsQIy0AkzMzllOoytSmwua57KbnNnCSBiE64TEjyUa2E5lpzyyLtfLRasZlYyna1nNBcRTfhglsENJGjcWRAPMf3vsZha3EGuAy0yz4ACY4qXRUmkOLJcAGzm85ZDPie9Ol0jXS7rB5gBrYDBHaeS6XcBkrIWqlxs6njZU6R7MIDWgRocogtJ1IPkvS3OB7v0znkmQx3R9Ucm4WhxHiSvF9Cq8E1A9jjIOA6ftMJHcDmF7i1hzDTpgukB9QwXBs5iTEkjlpyWf6X+3u2iwgHomgjER1R1S49aORPGF4XNrTDXMwECp2i0lrie46rwu23HSFoDiCTEdVscASrNvSFPN0vdrzYzw5lS23hda5RZs9gGr4MdVxa75SpNoU6YgehOEeMDNBuZdJHZkmcjlqPTPyVcWoNRzmOmDmCZcJ7M8wRomPPRZ/J168NmlTDi4jIl7QY74McI4LH2td4OAWNVvMtqksHeMYEjyV1zbinmwAj9UEg95zyHcFNzqpEFzmk6GQJ0gEa8/Ra5nZx8KhVexwYKbow51HdpxGUaDPM8vBTdQYHue5pxECQJEgR2s4J74lStX1RIc4nLIkCZjU5KNW5qspF1Qy5xhoAyH7ThPu8E1tPqxRuA+Q0hsCYGuHQ5LwNItMzM8eHee5PZxBioWAPIwl0dod37OZU7ms5rmtDMTXTiOXVyyMHX+yfN1Pula7rOERSbU6wyJHVy7Wfa4ZSq13UdDcZb0pLoz6usATEj0V2g0uJJAaYmIMB0azOeo9FF2z2OLXaOaMMiDAOZLTqJmNVOavEY6gajQS+mKZxRlBxciPf6IXttalVeMNGoGEHqktfk0ATm09onjyKSmr8aln1stazpkQWA+OarXTQBkBlpkDCELpenGdvC64DhrCxVzcOp0x0ZDYiAA0D0iEIWM3XBYs7l5c0E6ikTkPtAyvW0cSHguJyPE8uHLyQhTFckdo1HNolzSQSQJ4wTwPDyWRpHMIQrj2l/H/b3focz6lVnVnTTz11yHJCFrLtjHpZruIaCNS4DyOq8K1FuYjIzPDhHkhCIgKQxTGag6k1uItAB6MtmM8I0HhmhCw6K1Ks4AAHgD6yvWswYZ4xqST8UIW7+KfU7d5IzPBely0EZiYGSEKfE+sNaVnEyXGY/5fgstc6A9zUIWZ1W8/wAoqUe0TJ9THorDu1HAjPvQhbx6Yy7JtBrgQRx5ke8IQhWSMW1//9k=',
};

export default function Wine() {
  const { adicionarAoCarrinho } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={() => adicionarAoCarrinho(produto)}
      >
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preco: {
    color: '#FACC15',
    fontSize: 20,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});