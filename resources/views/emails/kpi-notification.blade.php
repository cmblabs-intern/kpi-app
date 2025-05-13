<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Penilaian KPI Anda</title>
    <style>
        /* Body Styles */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h2, h3 {
            color: #333;
            margin-top: 0;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
            margin: 10px 0;
        }
        ul {
            list-style-type: none;
            padding-left: 0;
        }
        li {
            font-size: 16px;
            color: #555;
            margin-bottom: 10px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding-top: 30px;
            margin-top: 30px;
            border-top: 1px solid #ddd;
        }
        .footer a {
            color: #00a6f4;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            background-color: #00a6f4;
            color: #000000;
            padding: 12px 24px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
        }
        .button:hover {
            background-color: #008cb5;
        }
        .button:visited {
            color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('logo.svg') }}" alt="Company Logo">
        </div>

        <h2>Halo {{ $employee['user']['name'] }},</h2>

        <p>Berikut ini adalah laporan penilaian KPI Anda untuk bulan {{ \Carbon\Carbon::parse($month)->format('F Y') }}:</p>

        <ul>
            <li><strong>Total Penilaian:</strong> {{ $total }}</li>
            <li><strong>Penilaian Terakhir:</strong> 
                @isset($latest['month']) 
                    {{ \Carbon\Carbon::parse($latest['month'])->translatedFormat('F Y') }} - {{ $latest['total_score'] }}
                @else
                    Data penilaian terakhir tidak tersedia.
                @endisset
            </li>
        </ul>

        <h3>Riwayat Penilaian:</h3>
        <ul>
            @forelse ($history as $item)
                <li>{{ \Carbon\Carbon::parse($item['month'])->translatedFormat('F Y') ?? 'Bulan tidak tersedia' }} - {{ $item['total_score'] ?? 'Skor tidak tersedia' }}</li>
            @empty
                <li>Tidak ada riwayat penilaian sebelumnya.</li>
            @endforelse
        </ul>

        <p>Untuk melihat detail lengkap penilaian KPI Anda, silakan klik tombol di bawah ini:</p>

        <a href="{{ url('http://127.0.0.1:8000/dashboard') }}" class="button">Lihat Dashboard</a>

        <div class="footer">
            <p>&copy; 2025 PT CMLABS INDONESIA DIGITAL</p>
            <p>Jika Anda memiliki pertanyaan, silakan hubungi kami di <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
        </div>
    </div>
</body>
</html>
