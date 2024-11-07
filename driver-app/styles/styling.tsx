import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: 
{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
},
  paragraph: 
{
    fontSize: 18,
    textAlign: 'center',
},
  map: 
{
    width: '100%',
    height: '70%',
},
  button: 
{
    padding: 15,
    backgroundColor: '#85D7E6',
    borderRadius: 10,
},
  buttonText: 
{
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
},
  searchInput: 
{
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontSize: 16,
    marginTop: 20
},
  searchContainer: {
    marginBottom: 20,
},
  selectedLocationContainer: {
    marginTop: 2,
},
  selectedLocationText: 
{
    color: '#333333',
    fontSize: 14,
    marginBottom: 10,
},
  card: 
{
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
},
  buttonContainer: 
{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 20,
},

acceptButton: 
{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
},
declineButton: 
{
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
},
});

export default styles