
// import React, { useState } from 'react';
// import { Page, Link } from 'framework7-react';
// import { useSignalDetails, useSearch } from '../hooks/useSignals';
// import SearchBar from '../components/SearchBar';
// import SignalsList from '../components/SignalsList';
// import '../css/SignalsPage.scss';


// export default function SignalsPage({ f7router, route }) {
//   const { symbol } = route.params;
//   const details = useSignalDetails(symbol);
//   const [query, setQuery] = useState('');

//   const suggestions = useSearch(query);

//   return (
//     <Page className="signals-page">
//       <div className="header">
//         <Link iconF7="chevron_left" onClick={() => f7router.back()} />
//         <h1>Signals</h1>
//         <Link iconF7="menu" />
//       </div>
//       <SearchBar query={query} onChange={setQuery} />
//       <SignalsList title="Suggestions" items={suggestions} />
//       <SignalsList title="Search History" items={details.history} />
//     </Page>
//   );
// }
