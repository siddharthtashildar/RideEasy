import { StyleSheet } from 'react-native';


export default StyleSheet.create({
container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#f6f7fb' },
title: { fontSize: 28, fontWeight: '700', marginTop: 8 },
titleSmall: { fontSize: 16, fontWeight: '600', marginTop: 4 },
card: { width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 8, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
label: { fontSize: 12, color: '#666', fontFamily: 'Poppins-Regular' },
input: { borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 8, padding: 8, marginTop: 6 },
btnPrimary: { marginTop: 12, backgroundColor: '#0b63ff', padding: 12, borderRadius: 8, alignItems: 'center' },
btnText: { color: '#fff', fontWeight: '700' },
sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
driverRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
driverName: { fontWeight: '700' },
driverSub: { fontSize: 12, color: '#666' },
driverRating: { fontWeight: '700' },
rideOption: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee', marginBottom: 8 },
rideOptionSelected: { borderColor: '#0b63ff', backgroundColor: '#eef4ff' },
rideName: { fontWeight: '700' },
rideSub: { fontSize: 12, color: '#666' },
value: { fontSize: 15, fontWeight: '600' },
});