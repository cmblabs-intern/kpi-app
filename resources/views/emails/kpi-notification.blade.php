<h2>Halo {{ $employee['name'] }},</h2>

<p>Berikut ini adalah laporan penilaian KPI Anda:</p>

<ul>
    <li><strong>Total Penilaian:</strong> {{ $total }}</li>
    <li><strong>Penilaian Terakhir:</strong> {{ $latest['bulan'] }} - {{ $latest['score'] }}</li>
</ul>

<h3>Riwayat Penilaian:</h3>
<ul>
    @forelse ($history as $item)
        <li>{{ $item['bulan'] }} - {{ $item['score'] }}</li>
    @empty
        <li>Tidak ada riwayat penilaian sebelumnya.</li>
    @endforelse
</ul>

<p>Terima kasih,<br>Tim HR</p>
